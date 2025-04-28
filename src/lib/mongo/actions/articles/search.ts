import { fetchWithCache } from "@/lib/redis/redis-fetch";
import { buildArticleSearchQuery } from "./query";
import { CollectionItem } from "@/types/data-structures/collection/item/item";

// This is wrong...
// boolean for trustHigher...
export type GetLatestArticlesProps = {
	// must, mustNot, filter, should
	query?: string;

	mustContain?: string[];
	mustNotContain?: string[];
	shouldContain?: string[];
	filterContain?: string[];

	minimumShouldMatch?: number;

	// remove
	textScore?: string;
	contentType?: string;

	// can't at the moment
	provider?: string;
	origin?: string;

	variant?: string;

	before?: Date;
	after?: Date;

	// cannot query provider at the moment
	// search index etc required
	trustHigher?: string;
	trustLower?: string;
	leaningHigher?: boolean;
	leaningLower?: boolean;

	durationHigher?: string;
	durationLower?: string;
	region?: string;
	language?: string;

	sort?: string;
	limit?: string;
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
