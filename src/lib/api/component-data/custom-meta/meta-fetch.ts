import { getMeta, MetaData } from "@/actions/html/get-meta";
import { Collection } from "@/types/data-structures/collection/collection";
import { WithQuery } from "@/types/page";
import { isStringValidURL } from "@/utils/url";

type MetaParams = {
	urls: string[];
	// cache shouldn't expire?
	// cacheExpiry: string;
};

// We need to convert meta into article data!
export const metaFetch = async (query: WithQuery) => {
	const { params } = query;
	const { urls } = params as MetaParams;

	if (!urls) {
		return {
			error: "No urls provided",
		};
	}

	const fetches: Promise<MetaData>[] = [];

	urls.forEach(async (url) => {
		const isValid = isStringValidURL(url);
		if (isValid) {
			try {
				const prom = (getMeta(url) as Promise<MetaData>) || null;
				prom.catch((error: Error) => {
					// This should stop the crash but we need to remove null from promise list
					console.error("Error fetching meta");
				});
				////////////////////////////////////
				// add redis data fetch and cache //
				////////////////////////////////////
				if (prom) {
					//meaningless check?
					fetches.push(prom);
				}
			} catch (error) {
				console.error("Error fetching meta");
			}
		}
	});

	const items = await Promise.all(fetches);

	const cleanItems = items.filter((item) => item);

	const convertedData = cleanItems.map((item) => {
		const { title, description, image, imageAlt, url } = item;
		return {
			title: title,
			src: url,
			description: description,
			guid: "",
			variant: "article",
			avatar: {
				src: image,
				alt: imageAlt,
			},
		};
	});

	return { items: convertedData } as Collection;
	// should be inputs for ArticleCollection data?
	//return { ...convertedData, items: finalData.filter((item) => item) };
};
