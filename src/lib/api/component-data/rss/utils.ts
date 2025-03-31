// Probbly temp just trying to be neat and tidy with the terrible code
const FeedType = {
	Article: "article",
	YouTube: "youtube",
} as const;

// What feed types? - we should have a list of these
export const determineFeedType = (url: URL) => {
	if (url.hostname === "www.youtube.com") {
		return FeedType.YouTube;
	}
	return FeedType.Article;
};

export const ArticleType = {
	Article: "article",
	YouTube: "youtube",
} as const;

// This could grow depending on structure of the rss feed for certain providers
export const getParserCustomFields = (type: string) => {
	if (type === FeedType.YouTube) {
		return {
			item: ["media:group"],
		};
	}
	return {};
};
