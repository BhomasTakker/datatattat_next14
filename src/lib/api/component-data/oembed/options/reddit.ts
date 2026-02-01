import { RedditOEmbedParams } from "@/types/data-structures/oembed";
import { createQueryParameters } from "../oembed-query-params";

const baseUrl = "https://www.reddit.com/oembed";
const scriptUrl = "https://embed.reddit.com/widgets.js";

export const redditOembed = {
	script: scriptUrl,
	createUrl: (params: RedditOEmbedParams) => {
		const { url } = params;
		const queryParams = createQueryParameters();

		return `${baseUrl}?url=${encodeURIComponent(url)}&${queryParams}`;
	},
};
