export * from "./trust";
export * from "./query-text";

import { GetLatestArticlesProps } from "../../search";
import { matchLeaning } from "./leaning";
import { matchProvider, matchProviderOrigin } from "./provider";
import { matchByRegion } from "./region";
import { matchTime } from "./time";
import { matchTrust } from "./trust";

export const matchVariant = (
	queryParams: GetLatestArticlesProps,
	aggregator: any[]
) => {
	if (queryParams.variant) {
		return [
			...aggregator,
			{
				$match: {
					variant: queryParams.variant,
				},
			},
		];
	}

	return aggregator;
};

export const matchContentType = (
	queryParams: GetLatestArticlesProps,
	aggregator: any[]
) => {
	if (queryParams.contentType) {
		return [
			...aggregator,
			{
				$match: {
					collectionType: queryParams.contentType,
				},
			},
		];
	}

	return aggregator;
};

export const match = (
	queryParams: GetLatestArticlesProps,
	aggregator: any[]
) => {
	const trusted = matchTrust(queryParams, aggregator);
	const variant = matchVariant(queryParams, trusted);
	const contentType = matchContentType(queryParams, variant);
	const leaning = matchLeaning(queryParams, contentType);
	const time = matchTime(queryParams, leaning);
	// group provider matches
	const provider = matchProvider(queryParams, time);
	const origin = matchProviderOrigin(queryParams, provider);
	const region = matchByRegion(queryParams, origin);
	// const language = matchLanguage(queryParams, region);

	return region;
};
