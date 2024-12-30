import { Observer, OperatorFunction } from "rxjs";
import {
	subscribeToObservableFromObject,
	Response,
} from "./observable/observable";
import { createObserver, createPipeFunctions } from "./observer/observer";
import { ConversionMap } from "./types";
import { UnknownObject } from "@/types/utils";

type Data = UnknownObject;
type Conversions = ConversionMap[];

// same as sub response
type ConversionsObject = {
	conversions: Conversions;
	responseKey?: string;
	iterable: boolean;
	default: Conversions;
};
// then reduce your array object keys etc
export const createResponse = (
	data: Data,
	conversionsObject: ConversionsObject,
	conversionsMap: Map<string, object>
) => {
	const { conversions = [], default: defaultConversions = [] } =
		conversionsObject;
	const joinedConversions = [...defaultConversions, ...conversions];

	if (joinedConversions.length === 0) {
		return data;
	}

	let updatedData;

	const nextHandler = (value: unknown) => {
		updatedData = value;
	};
	const completeHandler = () => {};
	const errorHandler = () => {};
	const observer = createObserver(nextHandler, completeHandler, errorHandler);

	const pipeFunctions = createPipeFunctions(joinedConversions, conversionsMap);

	const seedData = data || {};

	subscribeToObservableFromObject(
		seedData as unknown as Response,
		observer as Observer<unknown>,
		pipeFunctions as OperatorFunction<unknown, unknown>[]
	);

	return updatedData;
};
