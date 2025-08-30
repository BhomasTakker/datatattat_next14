import { WithQuery } from "@/types/component";
import { getOembedObject } from "./oembed-options";
import { OEmbed, OEmbedParams } from "@/types/data-structures/oembed";
import { UnknownObject } from "@/types/utils";
import { fetchOembedList } from "./utils";

enum OembedDirection {
	Normal = "normal",
	Reverse = "reverse",
}

type OembedListParams = {
	variant: OEmbedParams["variant"];
	direction: OembedDirection;
	collection: UnknownObject[];
};

type OembedListComponentProps = {
	items: OEmbed[];
	script: string;
};

export const oembedFetchList = async (
	query: WithQuery
): Promise<OembedListComponentProps | null> => {
	const { params } = query;

	const { variant, collection, direction } = params as OembedListParams;
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

	const sortedItems =
		direction === OembedDirection.Reverse
			? filteredResults.reverse()
			: filteredResults;

	return {
		items: sortedItems,
		script: script,
	};
};
