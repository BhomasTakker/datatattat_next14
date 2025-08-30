// Helper function to apply transducers to arrays
export const processWithTransducer = <TInput, TOutput>(
	data: TInput[],
	transducer: (
		reducer: (acc: TOutput[], value: TInput) => TOutput[]
	) => (acc: TOutput[], value: TInput) => TOutput[]
): TOutput[] => {
	const arrayReducer = (acc: TOutput[], value: TInput): TOutput[] => [
		...acc,
		value as unknown as TOutput,
	];
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
