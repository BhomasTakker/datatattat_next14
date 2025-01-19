// rxjs operators
// https://app.pluralsight.com/course-player?clipId=0558ef44-e83b-4c8d-aca0-eafd8ae2d16b

import { UnknownNumber, UnknownObject, UnknownString } from "@/types/utils";
import { getNestedValue } from "@/utils/object";
import {
	distinct as rxjsDistinct,
	first as rxjsFirst,
	last as rxjsLast,
	skip,
	skipLast,
	take,
	takeLast,
} from "rxjs";

import { filter } from "rxjs/operators";

// we can pass filter functions to first and last
export const first = ({}: never) => {
	return rxjsFirst();
};

export const last = ({}: never) => {
	return rxjsLast();
};

// if not number so nothing / return dummy tap? () => {log('something was suuposed to happen here.')}
export const topN = ({ amount }: { amount: number }) => {
	const n = amount ?? 10; // put through a get
	// take in wider data
	return take(n);
};

export const lastN = ({ amount }: { amount: number }) => {
	const n = amount ?? 10; // put through a get
	// take in wider data
	return takeLast(n);
};

export const skipN = ({ amount }: { amount: number }) => {
	const n = amount ?? 10;
	// take in wider data
	return skip(n);
};

export const skipLastN = ({ amount }: { amount: number }) => {
	const n = amount ?? 10;
	// take in wider data
	return skipLast(n);
};

export const distinct = ({}: never) => {
	// does this match this
	// we would need to pass a function to determine distintness / or just create a bunch
	// i.e. distinct((data) => props[props.key])
	return rxjsDistinct();
};

export const distinctKey = ({ key }: { key: string }) => {
	return rxjsDistinct((data: never) => {
		if (!key) {
			return data;
		}

		return getNestedValue<number>(key, data);
	});
};

// I guess split these up into sensible groupings
export const includes = ({ values, key }: { values: string; key: string }) => {
	return filter((value: UnknownString) => {
		const val = getNestedValue<string>(key, value);
		return values.split(",").includes(val);
	});
};

type NumericalConditional = {
	key: string;
	n: number;
};
/**
 * Provide a number value
 * @returns rxjs transducer
 */
export const greaterThan = ({ key, n }: NumericalConditional) => {
	return filter((value: UnknownNumber) => {
		const val = getNestedValue<number>(key, value);
		if (val && typeof +val !== "number") {
			return false;
		}

		return val > n;
	});
};

/**
 * Provide a number value
 * @returns rxjs transducer
 */
export const lessThan = ({ key, n }: NumericalConditional) => {
	return filter((value: UnknownNumber) => {
		const val = getNestedValue<number>(key, value);
		if (val && typeof +val !== "number") {
			return false;
		}
		return val < n;
	});
};

/**
 * Provide a number value
 * @returns rxjs transducer
 */
export const equals = ({ key, n }: NumericalConditional) => {
	return filter((value: UnknownObject) => {
		const val = getNestedValue<number>(key, value);
		if (val && typeof +val !== "number") {
			return false;
		}
		return val === +n;
	});
};

// Note -
// takeUntil / skipUntil? - takes/skips until a seperate observable has completed
//
// [xxx]While - would need a dynamic way of creating / passing a function
// Perhaps cool as f thing to have but ?? tricky, more v nice to have
// How useful really?
//
// distinct
// if a standard

/////////
// FILTERS
// filter, filterFirst, filterLast
// filter <- just a whole bunch of options right?
// maths operations, geo operations, date operations, string, equivelence, etc
// effectively select filter from available filters
// i.e. geo - North of, within range, outside range
// i.e. maths greaterThan, lessThan, within, outside
////////////////////////////////
// Above is how to do observables no?
// select from a list of predefined (with props) observables
// I don't know what they would be but...
