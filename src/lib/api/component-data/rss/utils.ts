// Feed Parser Utils?

import { RSSItem } from "@/types/data-structures/rss";

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

export const determineItemType = (item: RSSItem) => {
	const { link = "" } = item;
	const linkURL = new URL(link);
	if (linkURL.hostname === "www.youtube.com") {
		return ArticleType.YouTube;
	}
	return ArticleType.Article;
};

// This could grow depending on structure of the rss feed for certain providers
export const getParserCustomFields = (type: string) => {
	if (type === FeedType.YouTube) {
		return {
			item: ["media:group"],
		};
	}
	return {};
};

// Would we hve a sanitize?
// Do we remove html tags?
export const cleanResponses = <T>(responses: T[]) => {
	return responses.filter((response) => response);
};
