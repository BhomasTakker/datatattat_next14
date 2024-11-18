import { UnknownNumber, UnknownString } from "@/types/utils";
import { getNestedValue } from "@/utils/object";
import { map } from "rxjs";

// LOOK AT d3 sorting
// https://d3js.org/d3-array/sort

// Can also create summaries of data
// i.e create counts, and a bunch of shit
// https://d3js.org/d3-array/summarize

// I think this can almost certainly be done better with rxjs reduce?
export const numericAscending = ({ key }: { key: string }) => {
	return map((arr: UnknownNumber[]) =>
		arr.sort(
			(a, b) => getNestedValue<number>(key, a) - getNestedValue<number>(key, b)
		)
	);
};
export const numericDescending = ({ key }: { key: string }) => {
	return map((arr: UnknownNumber[]) =>
		arr.sort(
			(a, b) => getNestedValue<number>(key, b) - getNestedValue<number>(key, a)
		)
	);
};

export const dateTimeAscending = ({ key }: { key: string }) => {
	return map((arr: UnknownString[]) =>
		arr.sort((a, b) => {
			return (
				new Date(getNestedValue<string>(key, a)).getTime() -
				new Date(getNestedValue<string>(key, b)).getTime()
			);
		})
	);
};
export const dateTimeDescending = ({ key }: { key: string }) => {
	return map((arr: UnknownString[]) =>
		arr.sort((a, b) => {
			return (
				new Date(getNestedValue<string>(key, b)).getTime() -
				new Date(getNestedValue<string>(key, a)).getTime()
			);
		})
	);
};
