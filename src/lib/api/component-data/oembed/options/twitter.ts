import { TwitterOEmbedParams } from "@/types/data-structures/oembed";

const twitterBaseUrl = "https://publish.twitter.com/oembed";

const createQueryParameters = () => {
	const params = new URLSearchParams();
	params.set("omit_script", "1");
	return params.toString();
};

export const twitterOembed = {
	// config
	script: "https://platform.twitter.com/widgets.js",
	// we need to pass width etc to the oembed endpoint
	createUrl: (params: TwitterOEmbedParams) => {
		const { account, tweetId } = params;
		// timeline is not currently working so we will just return a tweet

		const queryParams = createQueryParameters();

		const url = `https://x.com/${account}/status/${tweetId}`;
		return `${twitterBaseUrl}?url=${encodeURIComponent(url)}&${queryParams}`;
	},
};
