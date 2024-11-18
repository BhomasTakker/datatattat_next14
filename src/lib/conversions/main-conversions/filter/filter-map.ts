export enum FilterOptions {
	topN = "topN",
	lastN = "lastN",
	skipN = "skipN",
	skipLastN = "skipLastN",
	///////////////////////
	distinct = "distinct",
	distinctKey = "distinctKey",
	// we can pass functions / filters to these - i.e. the first/last positive filter result
	first = "first",
	last = "last",

	///////////////////////
	// Group these
	includes = "includes",
	greaterThan = "greaterThan",
	lessThan = "lessThan",
	equals = "equals",
}

export const FILTER_MAP = {
	// top5: "top5",
	topN: FilterOptions.topN,
	lastN: FilterOptions.lastN,
	skipN: FilterOptions.skipN,
	skipLastN: FilterOptions.skipLastN,
	///////////////////////
	distinct: FilterOptions.distinct,
	distinctKey: FilterOptions.distinctKey,
	// we can pass functions / filters to these - i.e. the first/last positive filter result
	first: FilterOptions.first,
	last: FilterOptions.last,

	///////////////////////
	// Group these
	includes: FilterOptions.includes,
	greaterThan: FilterOptions.greaterThan,
	lessThan: FilterOptions.lessThan,
	equals: FilterOptions.equals,
} as const;
