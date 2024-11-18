import {
	ObservableInput,
	Observer,
	OperatorFunction,
	from,
	of,
	toArray,
} from "rxjs";

export type Response = ObservableInput<unknown>;

export const subscribeToObservableFromObject = (
	response: Response,
	observer: Observer<unknown>,
	pipeFunctions: OperatorFunction<unknown, unknown>[]
) => {
	const observable$ = of(response);
	// I think we add summarize here
	observable$.pipe(...(pipeFunctions as [])).subscribe(observer);
};
export const subscribeToObservableFromArray = (
	response: Response,
	observer: Observer<unknown>,
	pipeFunctions: OperatorFunction<unknown, unknown>[],
	sortFunctions: OperatorFunction<unknown, unknown>[]
) => {
	const observable$ = from(response);
	// Not for sort
	// We should return an array from sort no?
	// sort functions should be called after filters
	// filter, transform, sort
	observable$
		.pipe(...(pipeFunctions as []), toArray(), ...(sortFunctions as []))
		.subscribe(observer);
};
