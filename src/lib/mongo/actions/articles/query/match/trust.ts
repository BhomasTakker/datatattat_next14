import { GetLatestArticlesProps } from "../../search";

export const matchTrust = (
	queryParams: GetLatestArticlesProps,
	// Aggregator type does not like $match
	aggregator: any[]
) => {
	const { trustHigher, trustLower } = queryParams;
	let returnAggregator = aggregator;
	if (trustHigher) {
		returnAggregator = [
			...aggregator,
			{
				$match: {
					"provider.rating": { $gte: +trustHigher },
				},
			},
		];
	}
	if (trustLower) {
		returnAggregator = [
			...aggregator,
			{
				$match: {
					"provider.rating": { $lte: +trustLower },
				},
			},
		];
	}
	return returnAggregator;
};
