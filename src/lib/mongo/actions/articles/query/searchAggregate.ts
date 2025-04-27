import ArticleProvider from "@/models/ArticleProvider";
import { Aggregator } from ".";
import { GetLatestArticlesProps } from "../search";

// MongoDB Atlas Search Course
// https://learn.mongodb.com/learning-paths/atlas-search

const HARD_LIMIT = 100;

const getLimit = (queryParams: GetLatestArticlesProps) => {
	const { limit = HARD_LIMIT } = queryParams;
	let limitToUse = +limit <= HARD_LIMIT ? +limit : HARD_LIMIT;

	if (isNaN(+limit) || !limit) {
		limitToUse = HARD_LIMIT;
	}
	return limitToUse;
};

const addFilter = (
	filter: any[],
	query: string | number | boolean | object | unknown[],
	path: string,
	type: string = "text"
) => {
	if (query) {
		filter.push({
			[type]: {
				query,
				path,
			},
		});
	}
	return filter;
};

const addDurationRange = (
	filter: any[],
	queryParams: GetLatestArticlesProps
) => {
	const { durationHigher, durationLower } = queryParams;
	if (durationHigher || durationLower) {
		filter.push({
			range: {
				path: "media.duration",
				gt: durationHigher ? +durationHigher : undefined,
				lt: durationLower ? +durationLower : undefined,
			},
		});
	}
};

const addDateRange = (filter: any[], queryParams: GetLatestArticlesProps) => {
	const { before, after } = queryParams;
	if (before || after) {
		filter.push({
			range: {
				path: "details.published",
				gt: after ? new Date(after) : undefined,
				lt: before ? new Date(before) : undefined,
			},
		});
	}
	return filter;
};

const AvailableSort = {
	NONE: "none",
	RELEVANCE: "relevance",
	DATE_ASCENDING: "date-ascending",
	DATE_DESCENDING: "date-descending",
} as const;

export const addSort = (queryParams: GetLatestArticlesProps) => {
	const { sort } = queryParams;

	switch (sort) {
		case AvailableSort.RELEVANCE:
			// check a query!
			return {
				score: {
					$meta: "searchScore",
					order: 1,
				},
			};
		case AvailableSort.DATE_ASCENDING:
			return { "details.published": 1 };
		case AvailableSort.DATE_DESCENDING:
			return { "details.published": -1 };
		default:
			return undefined;
	}
};

export const createSearchAggregate = (
	queryParams: GetLatestArticlesProps,
	aggregaor: Aggregator
) => {
	const { query, variant, region, language } = queryParams;
	const filter: any[] = [];
	// if (query) {
	if (variant) addFilter(filter, variant, "variant");
	if (region) addFilter(filter, region, "details.region");
	if (language) addFilter(filter, language, "details.languge");

	// not sure how to pull trust rating out of this

	addDateRange(filter, queryParams);
	addDurationRange(filter, queryParams);

	const must: any[] = [];
	if (query) {
		addFilter(must, query, "title");
	}

	const isFilter = filter.length > 0 ? { filter } : {};
	const isMust = must.length > 0 ? { must } : {};
	// mustNot ....
	// should ...

	aggregaor.push({
		$search: {
			// Also working on our date index
			index: "title",
			scoreDetails: true,
			// create sort
			sort: addSort(queryParams),

			compound: {
				must: isMust ? must : undefined,
				filter: isFilter ? filter : undefined,
			},
			count: {
				type: "lowerBound",
			},
		},
	});
	// we need to use provider for
	aggregaor.push({
		$lookup: {
			from: ArticleProvider.collection.name,
			localField: "provider",
			foreignField: "_id",
			as: "provider",
		},
	});
	aggregaor.push({
		$addFields: {
			score: { $meta: "searchScore" },
			scoreDetails: { $meta: "searchScoreDetails" },
			provider: { $arrayElemAt: ["$provider", 0] },
		},
	});

	aggregaor.push({ $limit: getLimit(queryParams) });
	// }

	return aggregaor;
};
