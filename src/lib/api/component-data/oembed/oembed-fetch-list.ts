import { getOembed } from "@/actions/oembed/get-oembed";
import { WithQuery } from "@/types/component";
import { getOembedObject } from "./oembed-options";
import { OEmbedParams } from "@/types/data-structures/oembed";
import { UnknownObject } from "@/types/utils";

type OembedListParams = {
	variant: OEmbedParams["variant"];
	collection: UnknownObject[];
};

type OembedListComponentProps = {
	collection: UnknownObject[];
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

	// this would be our loop
	// split createUrl params from an array
	// then await Promise.all

	const fetchPromises = collection.map((item) => {
		// @ts-expect-error we have a type issue
		const url = createUrl(item);
		if (!url) {
			return Promise.reject("No URL provided");
		}
		return getOembed(url);
	});

	// @ts-expect-error we have a type issue
	const url = createUrl(params);

	if (!url) {
		return Promise.reject("No URL provided");
	}

	const results = await Promise.all(fetchPromises);
	if (!results || results.length === 0) {
		return null;
	}

	return {
		collection: results,
		script: script,
	};
};
