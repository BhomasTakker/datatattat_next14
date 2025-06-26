import { blueskyOembed } from "./options/bluesky";
import { twitterOembed } from "./options/twitter";

export enum OembedOptions {
	twitter = "twitter",
	bluesky = "bluesky",
}

type Options = typeof twitterOembed | typeof blueskyOembed;

const oembedMap = new Map<OembedOptions, Options>([
	[OembedOptions.twitter, twitterOembed],
	[OembedOptions.bluesky, blueskyOembed],
]);

export const getOembedObject = (id: OembedOptions) => {
	const selectedOembed = oembedMap.get(id);
	if (!selectedOembed) {
		console.error("Oembed option not found:", id);
		return null;
	}
	return selectedOembed;
};
