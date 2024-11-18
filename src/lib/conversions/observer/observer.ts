import { tap } from "rxjs";
import {
	CompleteCallback,
	ConversionObserver,
	NextCallback,
	ErrorCallback,
	ConversionMap,
} from "../types";
import { UnknownObject } from "@/types/utils";

export const createObserver = (
	nextCallback: NextCallback,
	completeCallback: CompleteCallback,
	errorCallback: ErrorCallback
): ConversionObserver => {
	return {
		next: nextCallback,
		error: errorCallback,
		// onComplete return
		complete: completeCallback,
	};
};

// type PipeFunction[] doesn't work?
type PipeFunctions = unknown[];

export const createPipeFunctions = (
	conversions: ConversionMap[],
	conversionsMap: Map<string, object>
) => {
	return conversions.reduce(
		(pipeFunctions: PipeFunctions, { type, id, props = {} }) => {
			// pass in props
			// pass in 'BING' and merge with BASE
			const hash = conversionsMap.get(type) as Map<string, object>;

			//Cal the function?
			const conversionFunction = hash?.get(id) as (
				props: UnknownObject
			) => void;

			const pipeFunction = conversionFunction
				? conversionFunction(props)
				: tap(() => {});

			// call function here? with props
			// to return usable conversion function
			return pipeFunction ? [...pipeFunctions, pipeFunction] : pipeFunctions;
		},
		[]
	);
};
