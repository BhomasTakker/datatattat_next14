"use server";

import {
	searchArticles as fetchArticles,
	GetLatestArticlesProps,
} from "@/lib/mongo/actions/articles/search";

export async function searchArticles(params: GetLatestArticlesProps) {
	return fetchArticles(params);
}
