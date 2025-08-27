import { WithQuery } from "@/types/component";
import { spotifyOembed } from "../../oembed/options/spotify";
import { fetchOembed } from "../../oembed/utils";
import { SpotifyOEmbedParams } from "@/types/data-structures/oembed";

export const spotifyOembedFetch = async ({
	params,
}: WithQuery): Promise<any> => {
	const { createUrl, script } = spotifyOembed;

	const result = await fetchOembed(params as SpotifyOEmbedParams, createUrl);

	// any additional processing?

	return {
		items: [result],
		script: script,
	};
};
