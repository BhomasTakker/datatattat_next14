import { WithQuery } from "@/types/page";
import { isStringValidURL } from "../../../../utils/url";
import { UnknownObject } from "@/types/utils";
import { fetchRSS } from "./fetch-rss";
import { convertResponse } from "@/lib/conversions/convert-response";
import { getMeta } from "@/actions/html/get-meta";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { Collection } from "@/types/data-structures/collection/collection";

type RssParams = {
	urls: string[];
	cacheExpiry: string;
};

// RSS Response - we know the shape
type DataResponse = {
	items: object[];
} & UnknownObject;

// Bit of a rough fix for now
// Meta calls are better for article data
const fetchMeta = async (items: CollectionItem[] = []) => {
	if (!items || !items?.map) {
		return Promise.resolve([]);
	}

	const data = items.map(async (item) => {
		const { src, details } = item;
		// const { url = "" } = enclosure || {};
		const meta = await getMeta(src);
		if (!meta) {
			return null;
		}
		const { title, description, image, imageAlt, url } = meta;

		return {
			title: title,
			src: url,
			description: description,
			guid: "",
			variant: "article",
			details,
			avatar: {
				src: image,
				alt: imageAlt,
			},
		};
	});

	return Promise.all(data);
};

export const rssFetch = async (query: WithQuery) => {
	const { params, conversions } = query;
	const { urls } = params as RssParams;

	if (!urls) {
		return {
			error: "No urls provided",
		};
	}

	const fetches: Promise<DataResponse>[] = [];

	urls.forEach(async (url) => {
		const isValid = isStringValidURL(url);
		if (isValid) {
			try {
				const prom = (fetchRSS(url) as Promise<DataResponse>) || null;
				////////////////////////////////////
				// add redis data fetch and cache //
				////////////////////////////////////
				if (prom) {
					fetches.push(prom);
				}
			} catch (error) {
				console.error("Error fetching rss", error);
			}
		}
	});

	// error handling?
	const responses = await Promise.all(fetches);

	// console.log("responses ", { fetches, responses });

	////////////////////////////////////////
	// Create merge responses or something
	// Or rightly this would be part pf conversins
	// not here and go over
	const mergedData = responses.reduce(
		(acc, cur) => ({
			...acc,
			items: cur?.items ? acc.items.concat(cur.items) : acc.items,
		}),
		// We should merge all into the main return
		{ ...responses[0] }
	);

	/////////////////////////////////////////////////
	// this typing is a bit of a hack
	// the function at leas should be generic
	// but also we only need this because we ae having to fetch meta here
	// Technically we may want to convert to something else
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
