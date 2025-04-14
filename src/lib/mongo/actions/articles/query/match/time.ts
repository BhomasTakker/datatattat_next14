import { GetLatestArticlesProps } from "../../search";

export const matchTime = (
	queryParams: GetLatestArticlesProps,
	aggregator: any[]
) => {
	const { before, after } = queryParams;
	let returnAggregator = aggregator;
	if (before) {
		returnAggregator.push({
			$match: {
				"details.published": {
					$lt: new Date(before),
				},
			},
		});
	}
	if (after) {
		returnAggregator.push({
			$match: {
				"details.published": {
					$gt: new Date(after),
				},
			},
		});
	}
	return returnAggregator;
};
