import { WithQuery } from "@/types/page";
import { isStringValidURL } from "../../../../utils/url";
import { UnknownObject } from "@/types/utils";
import { fetchRSS } from "./fetch-rss";
import { convertResponse } from "@/lib/conversions/convert-response";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { Collection } from "@/types/data-structures/collection/collection";
import { fetchWithCache } from "@/lib/redis/redis-fetch";
import { getArticle } from "@/actions/data/article/get-article";

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

/////////////////////////////////////
// Bit of a rough fix for now
// Meta calls are better for article data
/////////////////////////////////////
// Assumes that only articles are being fetched via rss
// Perhaps we should have rss types
// That determines what we do with the return data
///////////////////////////////////////////////
const fetchMeta = async (items: CollectionItem[] = []) => {
	if (!items || !items?.map) {
		return Promise.resolve([]);
	}

	////////////////////////////////////////////////
	// we need to fetch meta for x number of items - n should be variable
	// We could pass it as part of the query
	// return some data i.e. time - including the src for the rest
	// We probably should just send a meta loaded var?
	// Then in Article meta wrapper we can check and load if we have to
	// While also using InView to lazy load the article itself
	////////////////////////////////////////////////
	const data = items.map(async (item, i) => {
		if (i > ARTICLE_PRELOAD_NUMBER) {
			return Promise.resolve({ ...item, loadData: true });
		}
		return fetchWithCache(() => getArticle(item), item.src);
	});

	return Promise.all(data);
};

export const rssFetch = async (query: WithQuery) => {
	const { params, conversions } = query;
	const { urls } = params as RssParams;

	if (!urls) {
		return {
			// return empty
			error: "No urls provided",
		};
	}

	const fetches: Promise<DataResponse>[] = [];

	////////////////////////////////////////////////////////
	// Would we preload all feeds?
	// in short term yes but long term no we shouldn't
	// feeds here - I think we have to we have to
	////////////////////////////////////////////////////////
	urls.forEach(async (url) => {
		const isValid = isStringValidURL(url);
		if (isValid) {
			try {
				const prom = fetchWithCache(() => fetchRSS(url), url, RSS_CACHE_EXPIRY);
				prom.catch((error: Error) => {
					// This should stop the crash but we need to remove null from promise list
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
		}
	});

	// error handling?
	const responses = await Promise.all(fetches);

	// utils at least
	// Remove any null instances / i.e. load errors
	const cleanResponses = responses.filter((response) => response);

	// console.log("responses ", { fetches, responses });

	////////////////////////////////////////
	// Create merge responses or something
	// Or rightly this would be part pf conversions
	// not here and go over
	// Again utils at least / merge arrays
	////////////////////////////////////////
	// We need a massive run through conversions and transducers
	// That is where this goes.
	////////////////////////////////////////
	const mergedData = cleanResponses.reduce(
		(acc, cur) => ({
			...acc,
			items: cur?.items ? acc.items.concat(cur.items) : acc.items,
		}),
		// We should merge all into the main return
		{ ...cleanResponses[0] }
	);

	/////////////////////////////////////////////////
	// this typing is a bit of a hack
	// the function at leas should be generic
	// but also we only need this because we ae having to fetch meta here
	/////////////////////////////////////////////////
	const convertedData = convertResponse(mergedData, conversions) as Collection;
	/////////////////////////////////////////////////
	// temp - should be in conversions but rxjs :( //
	// we could get meta here and add to the response
	// but we shouldn't
	const finalData = await fetchMeta(convertedData.items);
	// if item exists return it
	return { ...convertedData, items: finalData.filter((item) => item) };
};
