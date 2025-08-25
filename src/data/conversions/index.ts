// A reusable map transducer
export const mapTransducer =
	<TInput, TOutput, TAccumulator>(
		fn: MapFunction<TInput, TOutput>
	): Transducer<TInput, TOutput, TAccumulator> =>
	(reducer: Reducer<TAccumulator, TOutput>) =>
	(acc: TAccumulator, value: TInput): TAccumulator =>
		reducer(acc, fn(value));

// A reusable filter transducer
export const filterTransducer =
	<T, TAccumulator>(
		predicate: PredicateFunction<T>
	): Transducer<T, T, TAccumulator> =>
	(reducer: Reducer<TAccumulator, T>) =>
	(acc: TAccumulator, value: T): TAccumulator =>
		predicate(value) ? reducer(acc, value) : acc;

// A reusable sort transducer
export const sortTransducer =
	<T>(compareFn: CompareFunction<T>) =>
	(reducer: Reducer<T[], T>) =>
	(acc: T[], value: T) => {
		const result = reducer(acc, value);
		return Array.isArray(result) ? result.sort(compareFn) : result;
	};

export const createTakeTransducer =
	<T, TAccumulator>(count: number): Transducer<T, T, TAccumulator> =>
	(reducer: Reducer<TAccumulator, T>) => {
		let taken = 0;
		return (acc: TAccumulator, value: T): TAccumulator => {
			if (taken < count) {
				taken++;
				return reducer(acc, value);
			}
			return acc;
		};
	};

export const createSkipTransducer =
	<T, TAccumulator>(count: number): Transducer<T, T, TAccumulator> =>
	(reducer: Reducer<TAccumulator, T>) => {
		let skipped = 0;
		return (acc: TAccumulator, value: T): TAccumulator => {
			if (skipped < count) {
				skipped++;
				return acc;
			}
			return reducer(acc, value);
		};
	};

// Helper function to apply transducers to arrays
export const processWithTransducer = <T>(
	data: T[],
	transducer: (
		reducer: (acc: T[], value: T) => T[]
	) => (acc: T[], value: T) => T[]
): T[] => {
	const arrayReducer = (acc: T[], value: T): T[] => [...acc, value];
	const transformedReducer = transducer(arrayReducer);
	return data.reduce(transformedReducer, []);
};

// Composing transducers - simplified approach for the specific use case
export const composeTransducers =
	<TAccumulator>(
		...transducers: Array<
			(reducer: Reducer<TAccumulator, any>) => Reducer<TAccumulator, any>
		>
	) =>
	(reducer: Reducer<TAccumulator, any>) =>
		transducers.reduceRight((acc, transducer) => transducer(acc), reducer);
