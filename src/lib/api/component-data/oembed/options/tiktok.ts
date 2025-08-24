import { TikTokOEmbedParams } from "@/types/data-structures/oembed";
import { createQueryParameters } from "../oembed-query-params";

const tiktokBaseUrl = "https://www.tiktok.com/oembed";

export const tiktokOembed = {
	script: "https://www.tiktok.com/embed.js",
	// we need to pass width etc to the oembed endpoint
	createUrl: (params: TikTokOEmbedParams) => {
		const { account, videoId } = params;

		const queryParams = createQueryParameters();

		// if video return this
		const url = `https://www.tiktok.com/@${account}/video/${videoId}`;
		return `${tiktokBaseUrl}?url=${encodeURIComponent(url)}&${queryParams}`;
	},
};
