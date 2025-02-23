import { FetchArticles } from "./articles/fetch-articles";
import { fetchRss } from "./fetch-rss";
import { GetCollection, SourceObject } from "./types";

type FetchCollectionsProps<T, G> = {
	sources?: SourceObject[];
	itemsCallback: ({}: FetchArticles) => Promise<T>;
	feedCallback: ({}: GetCollection) => Promise<G>;
	customFields?: Record<string, unknown>;
};

// Pass in the collections object
export const fetchCollections =
	<T, G>({
		sources = [],
		itemsCallback,
		feedCallback,
		customFields,
	}: FetchCollectionsProps<T, G>) =>
	async () => {
		const promises: Promise<void>[] = [];

		sources.forEach((source) => {
			const { sources, ...rest } = source;
			const prom = fetchRss<T, G>({
				urls: [],
				sources,
				callback: () => {},
				itemsCallback,
				feedCallback,
				customFields,
				extraData: rest,
			});
			promises.push(prom);
		});

		await Promise.all(promises);
	};
