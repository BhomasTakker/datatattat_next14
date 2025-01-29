import { getArticle } from "@/actions/data/article/get-article";
import { MetaData } from "@/actions/html/get-meta";
import { fetchWithCache } from "@/lib/redis/redis-fetch";
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

	urls.forEach(async (url) => {
		const isValid = isStringValidURL(url);
		if (isValid) {
			const prom = fetchWithCache(() => getArticle({ src: url }), url);
			fetches.push(prom);
		}
	});

	const items = await Promise.all(fetches);

	const cleanItems = items.filter((item) => item);

	return { items: cleanItems } as Collection;
};
