// use export * from 'xxx';
// We would expect a lot maybe?
import { getNestedValue } from "@/utils/object";
import { sortTransducer } from "../transducers";
import { SortDirection, SortType } from "./types";

// technically the same but we would/should have different validation checks

// Would you group in date/types files/folders
// Date
// filters - beforeDate, afterDate, betweenDate
// sort - ascending, descending
// filters - beforeTimeframe(2days), afterTimeframe, withinTimeframe
// filters - Day(s), Month(s), Year(s), week(s)
// filters - regex?

// Number
// filter - greaterThan, lessThan, range
// sort - numerical - ascending, descending

// String
// filter - contains, startsWith, endsWith, length, regex
// sort - alphabetical

// ???
// Array
// Object

export const createDateSortTransducer = <T>({
	id,
	type,
}: {
	id: string;
	type: SortDirection;
}) =>
	sortTransducer<T>((a, b) => {
		return type === SortDirection.Ascending
			? Date.parse(String(getNestedValue(id, a))) -
					Date.parse(String(getNestedValue(id, b)))
			: Date.parse(String(getNestedValue(id, b))) -
					Date.parse(String(getNestedValue(id, a)));
	});

export const createNumberSortTransducer = <T>({
	id,
	type,
}: {
	id: string;
	type: SortDirection;
}) =>
	sortTransducer<T>((a, b) => {
		return type === SortDirection.Ascending
			? Number(getNestedValue(id, a)) - Number(getNestedValue(id, b))
			: Number(getNestedValue(id, b)) - Number(getNestedValue(id, a));
	});

// separate off?
const sortMap = new Map([
	[SortType.Date, createDateSortTransducer],
	[SortType.Number, createNumberSortTransducer],
	// [SortType.String, createStringSortTransducer],
]);

export const getSortTransducer = <T>(
	sortType: SortType,
	id: string,
	direction: SortDirection
) => {
	const sortTransducer = sortMap.get(sortType);
	return sortTransducer ? sortTransducer<T>({ id, type: direction }) : null;
};
