import { Conversions } from "@/types/page";
import { UnknownObject } from "@/types/utils";
import { MAIN_CONVERSIONS } from "./main-conversions";
import { getConversion, mergeConversions } from "./conversions-map";
import { ConversionsObject, createIterable } from "./create-iterable";
import { createResponse } from "./create-response";

const createConversionsMap = (conversionId: string) => {
	const mainConversions = MAIN_CONVERSIONS;
	const queryConversions = getConversion(conversionId) as Map<string, object>;

	return mergeConversions(mainConversions, queryConversions);
};

/////////////////////////////////////////////////////////////
// Absolutely need to run through ths redo and refactor etc
export const convertResponse = (
	queryData: UnknownObject,
	conversions: Conversions
) => {
	const { response, conversionId, sub } = conversions;

	if (!conversionId) {
		return queryData;
	}

	const conversionsMap = createConversionsMap(conversionId);

	let subResponse = queryData;

	// run the iterable conversions on received data
	Object.values(sub).forEach((subObject: ConversionsObject) => {
		subResponse = createIterable(subResponse, subObject, conversionsMap);
	});

	const convertedResponse = createResponse(
		subResponse,
		response as ConversionsObject,
		conversionsMap
	);

	return convertedResponse;
};
