import { UnknownObject } from "@/types/utils";
import { OperatorFunction } from "rxjs";

export type NextCallback = (data: unknown) => void;
export type CompleteCallback = (data: unknown) => void;
export type ErrorCallback = (err: Error) => void;

export interface ConversionObserver {
	next: NextCallback;
	complete: CompleteCallback;
	error: ErrorCallback;
}

export type ConversionMap = {
	type: string;
	id: string;
	props?: UnknownObject;
};

export type PipeFunction = OperatorFunction<unknown, unknown>;
