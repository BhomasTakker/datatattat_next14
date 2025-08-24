import { SpotifyOEmbedParams } from "@/types/data-structures/oembed";
import { createQueryParameters } from "../oembed-query-params";

const spotifyBaseUrl = "https://open.spotify.com/oembed";

export const spotifyOembed = {
	script: "",
	createUrl: (params: SpotifyOEmbedParams) => {
		const { asset, contentId } = params;

		const queryParams = createQueryParameters();

		const url = `https://open.spotify.com/${asset}/${contentId}`;
		return `${spotifyBaseUrl}?url=${encodeURIComponent(url)}&${queryParams}`;
	},
};
