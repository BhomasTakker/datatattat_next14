import { WithQuery } from "@/types/page";
import { isStringValidURL } from "../../../../utils/url";
import { UnknownObject } from "@/types/utils";
import { rssParse } from "./rss-parse";
import { convertResponse } from "@/lib/conversions/convert-response";
import { Collection } from "@/types/data-structures/collection/collection";
import { fetchWithCache } from "@/lib/redis/redis-fetch";
import { fetchMeta } from "../html/meta/get-meta";
import { cleanResponses, determineFeedType } from "./utils";
import { RSSItem } from "@/types/data-structures/rss";
import { getCollection } from "@/actions/data/article-collection/get-article-collection";

const ARTICLE_PRELOAD_NUMBER = 10 - 1;
const RSS_CACHE_EXPIRY = 120; // seconds

type RssParams = {
	urls: string[];
	cacheExpiry: string;
};

// RSS Response - we know the shape
type DataResponse = {
	items: object[];
} & UnknownObject;

const mergeCollections = (collections: DataResponse[]) => {
	return collections.reduce(
		(acc, cur) => ({
			...acc,
			items: cur?.items ? acc.items.concat(cur.items) : acc.items,
		}),
		// We should merge all into the main return
		{ ...collections[0] }
	);
};
// Our conversions are currently a big bang
// In this instance we want to convert and filter merge and sort
// We should load the data feed by feed
// We should convert the data here / feed and item
// We should save the data
// We should cache the data
// we should filter the data
// We should then merge the data
// Then we should sort the data
// We should return the data
////////////////////////////////////
// If we have more control over what we call and when
// That will give us the flexibility without sacrificing performance
// So for each feed convert([feedN], transform(), save())
// convert(feed.items, transform(), save(), filter())
// convert([feed1, feed2], merge(), sort())
type FetchRSSCollections<T, G> = {
	urls: string[];
	itemsCallback: (items: RSSItem[]) => Promise<T>;
	feedCallback: (url: string, items: DataResponse) => Promise<G>;
	onComplete: <T, G>(data: G[]) => Promise<T>;
};
// I think your typing is is nonsense!
const fetchRSSCollections = async <T, G>({
	urls,
	feedCallback,
	itemsCallback,
	onComplete,
}: FetchRSSCollections<T, G>) => {
	const collectionPromises = urls.map((url) => {
		const isValid = isStringValidURL(url);
		if (isValid) {
			try {
				const prom = fetchWithCache(
					() => getCollection(url),
					url,
					RSS_CACHE_EXPIRY
				);
				prom.then(async (data) => {
					await feedCallback(url, data);
					await itemsCallback(data?.items || ([] as RSSItem[]));
				});
				prom.catch((error: Error) => {
					console.error(
						"Error fetching rss collectionPromises prom catch",
						error
					);
				});
				if (prom) {
					return prom;
				}
			} catch (error) {
				console.error("Error fetching rss collectionPromises", error);
			}
		}
	});

	const collections = (await Promise.all(collectionPromises)) as G[];
	return await onComplete(collections);
};

export const rssFetch = async (query: WithQuery) => {
	const { params, conversions } = query;
	const { urls } = params as RssParams;

	if (!urls) {
		return {
			error: "No urls provided",
		};
	}

	const completeHandler = async (data: DataResponse[]) => {
		const cleaned = cleanResponses<DataResponse>(data);
		const mergedData = mergeCollections(cleaned);
		const convertedData = convertResponse(
			mergedData,
			conversions
		) as Collection;
		const items = await fetchMeta(convertedData.items, ARTICLE_PRELOAD_NUMBER);
		return { ...convertedData, items: cleanResponses(items) };
	};

	const collections = await fetchRSSCollections({
		urls,
		feedCallback: async (url, items) => {},
		itemsCallback: async (items) => {},
		// @ts-expect-error - typing is not correct
		onComplete: completeHandler,
	});

	return collections;
};
