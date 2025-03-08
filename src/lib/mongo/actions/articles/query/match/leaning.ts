import { GetLatestArticlesProps } from "../../search";

export const matchLeaning = (
	queryParams: GetLatestArticlesProps,
	aggregator: any[]
) => {
	const { leaningHigher, leaningLower } = queryParams;
	let returnAggregator = aggregator;
	if (leaningHigher) {
		returnAggregator = [
			...aggregator,
			{
				$match: {
					"provider.leaning": { $gte: +leaningHigher },
				},
			},
		];
	}
	if (leaningLower) {
		returnAggregator = [
			...aggregator,
			{
				$match: {
					"provider.leaning": { $lte: +leaningLower },
				},
			},
		];
	}
	return returnAggregator;
};
