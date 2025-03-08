import { GetLatestArticlesProps } from "../../search";

export const matchProviider = (
	queryParams: GetLatestArticlesProps,
	aggregator: any[]
) => {
	const { provider } = queryParams;
	let returnAggregator = aggregator;
	if (provider) {
		const providerArray = provider.split(",");
		returnAggregator = [
			...aggregator,
			{
				$match: {
					"provider.name": {
						$in: providerArray,
					},
				},
			},
		];
	}
	return returnAggregator;
};
