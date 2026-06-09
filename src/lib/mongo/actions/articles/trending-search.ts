import { fetchWithCache } from "@/lib/redis/redis-fetch";
import {
	buildTrendingArticlesQuery,
	GetTrendingArticlesProps,
} from "./query/trending-query";
import { CollectionItem } from "@/types/data-structures/collection/item/item";

export const trendingSearch = async (params: GetTrendingArticlesProps) => {
	const CACHE_TIME = 60 * 60;
	const queryCacheKey = JSON.stringify(params);
	const articles = await fetchWithCache<CollectionItem[]>(
		async () => {
			return await buildTrendingArticlesQuery(params);
		},
		queryCacheKey,
		CACHE_TIME,
	);
	return { items: articles };
};
