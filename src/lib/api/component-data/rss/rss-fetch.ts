import { WithQuery } from "@/types/page";
import { isStringValidURL } from "../../../../utils/url";
import { UnknownObject } from "@/types/utils";
import { fetchRSS } from "./fetch-rss";
import { convertResponse } from "@/lib/conversions/convert-response";

type RssParams = {
	urls: string[];
	cacheExpiry: string;
};

// RSS Response - we know the shape
type DataResponse = {
	items: object[];
} & UnknownObject;

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

	const convertedData = convertResponse(mergedData, conversions);

	return convertedData;
};
