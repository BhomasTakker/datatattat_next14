// use export * from 'xxx';
// We would expect a lot maybe?
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
	id: Partial<keyof T>;
	type: SortDirection;
}) =>
	sortTransducer<T>((a, b) => {
		return type === SortDirection.Ascending
			? Date.parse(String(a[id])) - Date.parse(String(b[id]))
			: Date.parse(String(b[id])) - Date.parse(String(a[id]));
	});

export const createNumberSortTransducer = <T>({
	id,
	type,
}: {
	id: Partial<keyof T>;
	type: SortDirection;
}) =>
	sortTransducer<T>((a, b) => {
		return type === SortDirection.Ascending
			? Number(a[id]) - Number(b[id])
			: Number(b[id]) - Number(a[id]);
	});

// separate off?
const sortMap = new Map([
	[SortType.Date, createDateSortTransducer],
	[SortType.Number, createNumberSortTransducer],
	// [SortType.String, createStringSortTransducer],
]);

export const getSortTransducer = (
	sortType: SortType,
	id: string,
	direction: SortDirection
) => {
	const sortTransducer = sortMap.get(sortType);
	return sortTransducer ? sortTransducer({ id, type: direction }) : null;
};
