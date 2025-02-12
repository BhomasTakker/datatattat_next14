import { WithQuery } from "@/types/page";
import { isStringValidURL } from "../../../../utils/url";
import { UnknownObject } from "@/types/utils";
import { RSSParse } from "./rss-parse";
import { convertResponse } from "@/lib/conversions/convert-response";
import { Collection } from "@/types/data-structures/collection/collection";
import { fetchWithCache } from "@/lib/redis/redis-fetch";
import { fetchMeta } from "../html/meta/get-meta";
import {
	cleanResponses,
	determineFeedType,
	getParserCustomFields,
} from "./utils";
import { RSSItem } from "@/types/data-structures/rss";

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
const fetchRSSCollections = async <T, G>({
	urls,
	feedCallback,
	itemsCallback,
	onComplete,
}: FetchRSSCollections<T, G>) => {
	const collectionPromises = urls.map((url) => {
		const isValid = isStringValidURL(url);
		if (isValid) {
			const sourceType = determineFeedType(new URL(url));
			try {
				const prom = fetchWithCache(
					// getCollection / if youtube return data / else save and return src only
					() => RSSParse(url, getParserCustomFields(sourceType)),
					url,
					RSS_CACHE_EXPIRY
				);
				prom.then(async (data) => {
					// promiseCallback
					await feedCallback(url, data);
					// convert each rss return to a collection
					// itemsCallback
					await itemsCallback(data.items as RSSItem[]);
					// convert each item to a collection item
				});
				prom.catch((error: Error) => {
					console.error("Error fetching rss");
				});
				if (prom) {
					return prom;
				}
			} catch (error) {
				console.error("Error fetching rss");
			}
		}
	});

	// onComplete

	const collections = (await Promise.all(collectionPromises)) as G[];
	// const cleaned = cleanResponses<DataResponse>(collections);
	// const returnCollections = await onComplete<DataResponse>(collections);
	return await onComplete(collections);
};

// Half our problems go away if we load articleCollections rss from the database
// We HAVE to update this to load via the article loader api
// Caching accordingly
// Best bet is probably to host an external api for ALL data load
// AND conversions
export const rssFetch = async (query: WithQuery) => {
	const { params, conversions } = query;
	const { urls } = params as RssParams;

	// Perhaps check and return message if failed
	if (!urls) {
		return {
			// return empty
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
		return { ...convertedData, items: items.filter((item) => item) };
	};

	const collections = await fetchRSSCollections({
		urls,
		feedCallback: async (url, items) => {},
		itemsCallback: async (items) => {},
		// @ts-expect-error - typing for this is a mess we need to sort out properly
		onComplete: completeHandler,
	});

	return collections;
};
