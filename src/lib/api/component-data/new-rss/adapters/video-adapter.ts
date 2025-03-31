import { RSSChannelType, RSSItem } from "@/types/data-structures/rss";
import { YouTubeRSSItem } from "../../rss/types";
import { getArticleBySrc } from "@/lib/mongo/actions/article";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { saveArticle } from "../../rss/collections/articles/save";
import { cloneDeep } from "@/utils/object";
import { filterLimit } from "../utils/limit";

const adaptItem = async (item: YouTubeRSSItem) => {
	const media = item["media:group"];
	const mediaTitle = media["media:title"][0];
	const mediaThumbnail = media["media:thumbnail"][0].$.url;
	const mediaDescription = media["media:description"][0];
	const mediaCommunity = media["media:community"][0];
	const rating = mediaCommunity["media:starRating"][0].$.average;
	const views = mediaCommunity["media:statistics"][0].$.views;

	const { title, description, link, pubDate, author, id, isoDate } = item;

	if (!link) {
		return item;
	}

	const existingArticle = await getArticleBySrc(link);
	if (existingArticle) {
		return existingArticle;
	}

	const article: CollectionItem = {
		title,
		src: link,
		description: description || mediaDescription,
		guid: id,
		variant: "video",
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

	await saveArticle(article);
	return article;
};

export const videoAdapter = async (article: RSSChannelType) => {
	const { link, feedUrl, title, items = [] } = article;

	const filteredItems = filterLimit(items) as RSSItem[];

	const promises = filteredItems.map((item) => {
		return adaptItem(item as YouTubeRSSItem);
	});
	const articles = await Promise.all(promises);
	const collection = {
		link,
		feedUrl,
		title,
		items: articles,
	};

	return cloneDeep(collection);
};
