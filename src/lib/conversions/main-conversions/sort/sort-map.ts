export enum SortOptions {
	numericAscending = "numericAscending",
	numericDescending = "numericDescending",
	dateTimeAscending = "dateTimeAscending",
	dateTimeDescending = "dateTimeDescending",
}
export const SORT_MAP = {
	numericAscending: SortOptions.numericAscending,
	numericDescending: SortOptions.numericDescending,
	dateTimeAscending: SortOptions.dateTimeAscending,
	dateTimeDescending: SortOptions.dateTimeDescending,
} as const;
