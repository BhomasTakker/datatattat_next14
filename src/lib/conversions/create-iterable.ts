import { Observer, OperatorFunction } from "rxjs";
import {
	Response,
	subscribeToObservableFromArray,
	subscribeToObservableFromObject,
} from "./observable/observable";
import { createObserver, createPipeFunctions } from "./observer/observer";
import { ConversionMap } from "./types";
import { UnknownObject } from "@/types/utils";
import { cloneDeep } from "@/utils/object";

// absolutely we could create a very efficient way to do this
// with subObjects array and main response data
// for now simplest way forward

type Data = UnknownObject;
type Conversions = ConversionMap[];

// default is an extraordinarily bad name
// why do you keep doing this?
export type ConversionsObject = {
	conversions: Conversions;
	responseKey: string;
	iterable: boolean;
	default: Conversions;
};
// then reduce your array object keys etc
export const createIterable = (
	data: Data,
	//should be an object
	conversionsObject: ConversionsObject,
	conversionsMap: Map<string, object>
) => {
	const {
		conversions = [],
		responseKey,
		iterable,
		default: defaultConversions = [],
	} = conversionsObject;

	const joinedConversions = [...defaultConversions, ...conversions];

	if (joinedConversions.length === 0) {
		return data;
	}
	const updatedData = cloneDeep(data);

	const nextHandler = (value: unknown) => {
		updatedData[responseKey] = value;
	};
	const completeHandler = () => {};
	const errorHandler = (err: Error) => {
		console.log("ERROR", err);
	};
	const observer = createObserver(nextHandler, completeHandler, errorHandler);

	const transformConversions = joinedConversions.filter(
		(conversion) => conversion.type === "TRANSFORM"
	);
	const filterConversions = joinedConversions.filter(
		(conversion) => conversion.type === "FILTER"
	);
	const sortConversions = joinedConversions.filter(
		(conversion) => conversion.type === "SORT"
	);

	// was conversions for pipeFunctions
	const pipeFunctions = createPipeFunctions(
		[...filterConversions, ...transformConversions],
		conversionsMap
	);
	const sortFunctions = createPipeFunctions(sortConversions, conversionsMap);

	const seedData = data?.[responseKey]
		? data[responseKey]
		: data?.length
		? data
		: [];
	// prob check not here
	if (iterable) {
		subscribeToObservableFromArray(
			// ugly temp
			seedData as Response,
			observer as Observer<unknown>,
			pipeFunctions as OperatorFunction<unknown, unknown>[],
			sortFunctions as OperatorFunction<unknown, unknown>[]
		);
	} else {
		subscribeToObservableFromObject(
			// ugly temp
			seedData as Response,
			observer as Observer<unknown>,
			pipeFunctions as OperatorFunction<unknown, unknown>[]
		);
	}

	return updatedData;
};
