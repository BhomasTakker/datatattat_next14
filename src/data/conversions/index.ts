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
