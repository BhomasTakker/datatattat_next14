// Type definitions for transducers
type Reducer<TAccumulator, TValue> = (
	acc: TAccumulator,
	value: TValue
) => TAccumulator;

type Transducer<TInput, TOutput, TAccumulator> = (
	reducer: Reducer<TAccumulator, TOutput>
) => Reducer<TAccumulator, TInput>;

type MapFunction<TInput, TOutput> = (value: TInput) => TOutput;
type PredicateFunction<T> = (value: T) => boolean;
type CompareFunction<T> = (a: T, b: T) => number;
