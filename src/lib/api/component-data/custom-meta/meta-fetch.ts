import { getMeta, MetaData } from "@/actions/html/get-meta";
import { fetchWithCache } from "@/lib/redis/redis-fetch";
import { Details } from "@/types/data-structures/collection/base";
import { Collection } from "@/types/data-structures/collection/collection";
import { WithQuery } from "@/types/page";
import { isStringValidURL } from "@/utils/url";

type MetaParams = {
	urls: string[];
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

	const getMetaItem = async (metaURL: string, details?: Details) => {
		const meta = await getMeta(metaURL);
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
			details: {},
			avatar: {
				src: image,
				alt: imageAlt,
			},
		};
	};

	urls.forEach(async (url) => {
		const isValid = isStringValidURL(url);
		if (isValid) {
			const prom = fetchWithCache(() => getMetaItem(url), url);
			fetches.push(prom);
		}
	});

	const items = await Promise.all(fetches);

	const cleanItems = items.filter((item) => item);

	return { items: cleanItems } as Collection;
	// should be inputs for ArticleCollection data?
	//return { ...convertedData, items: finalData.filter((item) => item) };
};
