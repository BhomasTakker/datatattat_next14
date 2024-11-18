import {
	distinct,
	distinctKey,
	equals,
	first,
	greaterThan,
	includes,
	last,
	lastN,
	lessThan,
	skipLastN,
	skipN,
	topN,
} from "./filter";
import {
	numericDescending,
	numericAscending,
	dateTimeDescending,
	dateTimeAscending,
} from "./sort";
import { FilterOptions } from "./filter/filter-map";
import { SortOptions } from "./sort/sort-map";

// back end functions list
export const TRANSFORM = new Map<string, object>([]);

export const SORT = new Map<string, object>([
	// this one needs updating....
	[SortOptions.numericDescending, numericDescending],
	[SortOptions.numericAscending, numericAscending],
	[SortOptions.dateTimeDescending, dateTimeDescending],
	[SortOptions.dateTimeAscending, dateTimeAscending],
]);

export const FILTER = new Map<string, object>([
	// ["top5", top5],
	// These should be SAMPLE - called at end of filters and sorts etc
	[FilterOptions.first, first],
	[FilterOptions.last, last],
	[FilterOptions.topN, topN],
	[FilterOptions.lastN, lastN],
	[FilterOptions.skipN, skipN],
	[FilterOptions.skipLastN, skipLastN],

	//
	[FilterOptions.distinct, distinct],
	[FilterOptions.distinctKey, distinctKey],
	////////////////////////////
	[FilterOptions.includes, includes],
	[FilterOptions.greaterThan, greaterThan],
	[FilterOptions.lessThan, lessThan],
	[FilterOptions.equals, equals],
]);

export const MAIN_CONVERSIONS = new Map<string, Map<string, object>>([
	["TRANSFORM", TRANSFORM],
	["FILTER", FILTER],
	["SORT", SORT],
]);
