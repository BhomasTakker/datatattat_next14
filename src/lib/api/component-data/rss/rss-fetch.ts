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

const fetchMeta = async (items: CollectionItem[]) => {
	const data = items.map(async (item) => {
		const { src, details } = item;
		// const { url = "" } = enclosure || {};
		const meta = await getMeta(src);
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

	const fetches: DataResponse[] = [];

	urls.forEach(async (url) => {
		const isValid = isStringValidURL(url);
		if (isValid) {
			try {
				const prom = fetchRSS(url);
				////////////////////////////////////
				// add redis data fetch and cache //
				////////////////////////////////////
				fetches.push(prom as unknown as DataResponse);
			} catch (error) {
				console.error("Error fetching rss", error);
			}
		}
	});

	const responses = await Promise.all(fetches);

	const mergedData = responses.reduce(
		(acc, cur) => ({ ...acc, items: acc.items.concat(cur.items) || acc.items }),
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
	// console.log("Return", { item: await finalData[0] });
	return { ...convertedData, items: finalData };
};
