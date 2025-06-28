import { BlueskyOEmbedParams } from "@/types/data-structures/oembed";
import { createQueryParameters } from "../oembed-query-params";

const baseUrl = "https://embed.bsky.app/oembed";

export const blueskyOembed = {
	script: "https://embed.bsky.app/static/embed.js",
	createUrl: (params: BlueskyOEmbedParams) => {
		const { account, postId } = params;
		const queryParams = createQueryParameters();

		const url = `https://bsky.app/profile/${account}/post/${postId}`;
		return `${baseUrl}?url=${encodeURIComponent(url)}&${queryParams}`;
	},
};
