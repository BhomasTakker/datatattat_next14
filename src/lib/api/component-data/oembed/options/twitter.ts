import { OEmbedParams } from "../oembed-fetch";

export const twitterOembed = {
	// config
	script: "https://platform.twitter.com/widgets.js",
	createUrl: (params: OEmbedParams) => {
		return "https://publish.twitter.com/oembed?url=https://x.com/tparsi/status/1937480651868881310&omit_script=1";
	},
};
