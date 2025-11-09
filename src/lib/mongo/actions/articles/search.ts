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

	// details
	categories?: string;

	// media
	mediaType?: string;

	// can't at the moment
	provider?: string | string[]; // Support single or multiple providers
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
	// coverage used for scoping articles.
	// i.e. local news is IN US
	// but I want US && national news - maybe add sub-local
	coverage?: "international" | "national" | "regional" | "local";
	// should be temp - we want region to be a  multi select
	// with region - this and this
	// this or this
	// not this and not this
	// i.e. filter for Birmingham filter NOT Alabama i.e.
	// with live search to select continent, country, state, city, etc
	// all as a 'region'
	continent?: string;
	country?: string;
	state?: string;
	city?: string;

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
