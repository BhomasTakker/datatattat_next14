import { RSSChannelType } from "@/types/data-structures/rss";
import { cloneDeep } from "@/utils/object";
import { YouTubeRSSItem } from "../../rss/types";

const adaptItem = (item: YouTubeRSSItem) => {
	const media = item["media:group"];
	const mediaTitle = media["media:title"][0];
	const mediaThumbnail = media["media:thumbnail"][0].$.url;
	const mediaDescription = media["media:description"][0];
	const mediaCommunity = media["media:community"][0];
	const rating = mediaCommunity["media:starRating"][0].$.average;
	const views = mediaCommunity["media:statistics"][0].$.views;

	const { title, description, link, pubDate, author, id, isoDate } = item;

	const newItem = {
		title,
		src: link,
		description: description || mediaDescription,
		guid: id,
		variant: "video",
		format: "youtube",
		avatar: {
			src: mediaThumbnail,
			alt: mediaTitle || "",
		},
		details: {
			published: pubDate,
			publishers: [author],
		},
		media: {
			format: "youtube",
			rating,
			views,
		},
		// provider,
		// collectionType,
	};
	// saveArticle
	return newItem;
};

export const videoAdapter = async (article: RSSChannelType) => {
	const { link, feedUrl, title, items = [] } = article;
	const promises = items.map((item) => {
		return adaptItem(item as YouTubeRSSItem);
	});
	const articles = await Promise.all(promises);
	const collection = {
		link,
		feedUrl,
		title,
		items: articles,
	};

	return collection;
};
