import { twitterOembed } from "./options/twitter";

export enum OembedOptions {
	twitter = "twitter",
}

type Options = typeof twitterOembed;

const oembedMap = new Map<OembedOptions, Options>([
	[OembedOptions.twitter, twitterOembed],
]);

export const getOembedObject = (id: OembedOptions) => {
	const selectedOembed = oembedMap.get(id);
	if (!selectedOembed) {
		console.error("Oembed option not found:", id);
		return null;
	}
	return selectedOembed;
};
