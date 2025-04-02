import { fetchWithCache } from "@/lib/redis/redis-fetch";
import { buildArticleSearchQuery } from "./query";
import { CollectionItem } from "@/types/data-structures/collection/item/item";

// This is wrong...
// boolean for trustHigher...
export type GetLatestArticlesProps = {
	query?: string;
	textScore?: string;
	//match
	provider?: string;
	origin?: string;
	variant?: string;
	contentType?: string;
	before?: Date;
	after?: Date;
	trustHigher?: boolean;
	trustLower?: boolean;
	durationHigher?: string;
	durationLower?: string;
	leaningHigher?: boolean;
	leaningLower?: boolean;
	region?: string;
	language?: string;
	// sort
	sort?: string;
	// limit
	limit?: string;
	// count? reutn count of articles
};

export const searchArticles = async (params: GetLatestArticlesProps) => {
	const CACHE_TIME = 60 * 60;
	const queryCacheKey = JSON.stringify(params);
	const articles = await fetchWithCache<CollectionItem[]>(
		async () => {
			return await buildArticleSearchQuery(params);
		},
		queryCacheKey,
		CACHE_TIME,
		true
	);

	return {
		// what other data - paginaton etc
		items: articles,
	};
};
