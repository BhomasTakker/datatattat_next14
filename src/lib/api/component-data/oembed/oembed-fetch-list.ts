import { WithQuery } from "@/types/component";
import { getOembedObject } from "./oembed-options";
import { OEmbed, OEmbedParams } from "@/types/data-structures/oembed";
import { UnknownObject } from "@/types/utils";
import { fetchOembedList } from "./utils";

type OembedListParams = {
	variant: OEmbedParams["variant"];
	collection: UnknownObject[];
};

type OembedListComponentProps = {
	items: OEmbed[];
	script: string;
};

// Make WithQuery generic so we don't have to caste
// Not really fetch - more like get oembed data
// We need to use selected variant to get required data
export const oembedFetchList = async (
	query: WithQuery
): Promise<OembedListComponentProps | null> => {
	const { params } = query;

	const { variant, collection } = params as OembedListParams;
	const oembedCreator = getOembedObject(variant);
	if (!oembedCreator) {
		console.error("No oEmbed creator found for variant:", variant);
		return null;
	}

	const { createUrl, script } = oembedCreator;

	// @ts-expect-error - type issue fix me
	const results = await fetchOembedList(collection, createUrl);
	if (!results || results.length === 0) {
		return null;
	}

	const filteredResults = results.filter((item) => item !== null) as OEmbed[];

	return {
		items: filteredResults,
		script: script,
	};
};
