import { BlueskyOEmbedParams } from "@/types/data-structures/oembed";
import { createQueryParameters } from "../oembed-query-params";

const baseUrl = "https://embed.bsky.app/oembed";
const scriptUrl = "https://embed.bsky.app/static/embed.js";

export const blueskyOembed = {
	script: scriptUrl,
	createUrl: (params: BlueskyOEmbedParams) => {
		const { account, postId } = params;
		const queryParams = createQueryParameters();

		const url = `https://bsky.app/profile/${account}/post/${postId}`;
		return `${baseUrl}?url=${encodeURIComponent(url)}&${queryParams}`;
	},
};

export const blueskyOembedByUri = {
	script: scriptUrl,
	createUrl: (uri: string) => {
		const queryParams = createQueryParameters();
		return `${baseUrl}?url=${encodeURIComponent(uri)}&${queryParams}`;
	},
};
