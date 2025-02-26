import { UnknownObject } from "@/types/utils";
import { FetchArticles } from "./articles/fetch-articles";
import { ArticleSource, ExtraData, GetCollection } from "./types";
import { DataResponse } from "@/types/data-structures/rss";
import { getArticleProviderByName } from "@/lib/mongo/actions/article-provider";
import { ProviderItem } from "@/types/data-structures/collection/item/item";
import { rssParse } from "../rss-parse";

type FetchRSS<T, G> = {
	urls: string[];
	extraData?: ExtraData;
	sources?: ArticleSource[];
	callback: Callback;
	itemsCallback: ({ items, extraData, provider }: FetchArticles) => Promise<T>;
	feedCallback: ({
		url,
		rssFeed,
		extraData,
		provider,
	}: GetCollection) => Promise<G>;
	customFields?: UnknownObject | undefined;
};

// This could probably be better but it works for now
// and only resets state when all are loaded or otherwise completed

type Callback = () => void;

// pass in fetchArticles as an items callback
export const fetchRss = async <T, G>({
	urls,
	sources = [],
	extraData,
	callback,
	feedCallback,
	itemsCallback,
	customFields,
}: FetchRSS<T, G>) => {
	const fetches: Promise<DataResponse>[] = [];

	// console.log("extraData", { extraData });

	sources.forEach(async ({ name, src }) => {
		try {
			const prom = rssParse(src, customFields) as Promise<DataResponse>;
			// get Provider
			const provider = (await getArticleProviderByName(
				name
			)) as unknown as ProviderItem;
			// could just pass a single callbck?
			prom.then(async (data) => {
				const items = data?.items || [];
				// if (items.length === 0) {
				// 	console.log("No items for this feed", { src, data });
				// }

				// passin extra data - and do what we will in the finctions with it
				// pass provider!!!!
				try {
					await feedCallback({ url: src, rssFeed: data, extraData, provider });
				} catch (err) {
					console.error("Error fetching rss feed", { err });
				}
				try {
					await itemsCallback({ items, extraData, provider });
				} catch (err) {
					console.error("Error fetching rss items", { err });
				}
			});
			prom.catch((error: Error) => {
				console.error("Error fetching rss");
			});
			////////////////////////////////////
			// add redis data fetch and cache //
			////////////////////////////////////
			if (prom) {
				fetches.push(prom);
			}
		} catch (error) {
			console.error("Error fetching rss");
		}
	});

	Promise.all(fetches)
		.then((data) => {
			console.log("We havve completed all loads!");
		})
		.catch((error) => {
			console.error("Error fetching rss log me!");
		})
		.finally(() => {
			console.log("Error or successful completion. Reset fetch");
			callback();
		});
};
