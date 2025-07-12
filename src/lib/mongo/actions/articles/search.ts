import { fetchWithCache } from "@/lib/redis/redis-fetch";
import { buildArticleSearchQuery } from "./query";
import { CollectionItem } from "@/types/data-structures/collection/item/item";

export type GetLatestArticlesProps = {
	mustContain?: string[];
	mustNotContain?: string[];
	shouldContain?: string[];
	filterContain?: string[];

	minimumShouldMatch?: number;

	// remove
	textScore?: string;
	contentType?: string;

	categories?: string;

	// can't at the moment
	provider?: string;
	origin?: string;

	variant?: string;

	// time based
	before?: Date;
	after?: Date;
	within?: string;

	// cannot query provider at the moment
	// search index etc required
	trustHigher?: string;
	trustLower?: string;
	leaningHigher?: string;
	leaningLower?: string;

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
