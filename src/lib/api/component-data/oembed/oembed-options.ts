import { blueskyOembed } from "./options/bluesky";
import { tiktokOembed } from "./options/tiktok";
import { twitterOembed } from "./options/twitter";

export enum OembedOptions {
	twitter = "twitter",
	bluesky = "bluesky",
	tiktok = "tiktok",
}

type Options =
	| typeof twitterOembed
	| typeof blueskyOembed
	| typeof tiktokOembed;

const oembedMap = new Map<OembedOptions, Options>([
	[OembedOptions.twitter, twitterOembed],
	[OembedOptions.bluesky, blueskyOembed],
	[OembedOptions.tiktok, tiktokOembed],
]);

export const getOembedObject = (id: OembedOptions) => {
	const selectedOembed = oembedMap.get(id);
	if (!selectedOembed) {
		console.error("Oembed option not found:", id);
		return null;
	}
	return selectedOembed;
};
