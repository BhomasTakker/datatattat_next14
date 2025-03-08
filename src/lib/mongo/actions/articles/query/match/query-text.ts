import { Aggregator } from "..";
import { GetLatestArticlesProps } from "../../search";

export const matchQuery = (
	queryParams: GetLatestArticlesProps,
	aggregator: Aggregator
) => {
	const { query } = queryParams;
	if (query) {
		return [
			...aggregator,
			{
				$match: {
					$text: { $search: query },
				},
			},
		];
	}
	return aggregator;
};
