import { getOembed } from "@/actions/oembed/get-oembed";
import { WithQuery } from "@/types/component";
import { getOembedObject } from "./oembed-options";
import { OEmbedComponentProps } from "@/components/content/components/content-oembed/content-oembed";
import {
	OEmbedParams,
	GenericOEmbedParams,
} from "@/types/data-structures/oembed";

// Make WithQuery generic so we don't have to caste
// Not really fetch - more like get oembed data
// We need to use selected variant to get required data
export const oembedFetch = async (
	query: WithQuery
): Promise<OEmbedComponentProps | null> => {
	const { params } = query;
	const { variant } = params as OEmbedParams;
	const oembedCreator = getOembedObject(variant);
	if (!oembedCreator) {
		console.error("No oEmbed creator found for variant:", variant);
		return null;
	}

	const { createUrl, script } = oembedCreator;
	// @ts-expect-error we have a type issue
	const url = createUrl(params);

	if (!url) {
		return Promise.reject("No URL provided");
	}

	try {
		const oembed = await getOembed(url);

		if (!oembed.html) {
			return Promise.reject("No HTML found in oEmbed response");
		}

		return { oembed, script: script };
	} catch (err) {
		console.error("Error fetching oEmbed data:", err);
		return null;
	}
};
