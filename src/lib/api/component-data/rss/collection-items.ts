import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { RSSItem } from "@/types/data-structures/rss";
import { YouTubeRSSItem } from "./types";
import { cloneDeep } from "@/utils/object";

const createMainArticle = (data: RSSItem): CollectionItem => {
	const {
		title,
		// content potentially more likely to have html
		content,
		description,
		author,
		category,
		link,
		pubDate,
		enclosure,
		contentSnippet,
	} = data;
	const { url = "" } = enclosure || {};

	return {
		title: title,
		src: link,
		description: contentSnippet || content || description,
		guid: "",
		// Type hre surely
		variant: "article",
		details: {
			published: pubDate,
			categories: category ? [category] : [],
			publishers: author ? [author] : [],
		},
		avatar: {
			src: url,
			alt: title,
		},
		// I don't really want to do this but how do we get
		// unique or extended data?
		// we want media:group from youtube
		// There's a better way - just builder the thing right?
		// Pass an object through a function that applies each stage
		// essentially building the object
		original: cloneDeep(data),
	};
};

// We still need to save this jazz though!
const createYouTubeType = (item: CollectionItem) => {
	const { original } = item;
	const youtubeItem = original as YouTubeRSSItem;

	const media = youtubeItem["media:group"];
	const mediaTitle = media["media:title"][0];
	const mediaThumbnail = media["media:thumbnail"][0].$.url;
	const mediaDescription = media["media:description"][0];
	const mediaCommunity = media["media:community"][0];
	const rating = mediaCommunity["media:starRating"][0].$.average;
	const views = mediaCommunity["media:statistics"][0].$.views;

	const { title, description, link, pubDate, author, id, isoDate } =
		youtubeItem;
	const newItem = {
		title,
		src: link,
		description: description || mediaDescription,
		guid: id,
		variant: "video",
		type: "youtube",
		avatar: {
			src: mediaThumbnail,
			alt: mediaTitle || "",
		},
		rating,
		views,
		details: {
			published: pubDate,
			publishers: [author],
		},
	};

	return newItem;
};

const createMetaItem = (item: CollectionItem) => {
	return {
		...item,
		meta: true,
	};
};

const applyType = (item: CollectionItem, type: string) => {
	// use a map but
	switch (type) {
		case "youtube":
			return createYouTubeType(item);
		default:
			return createMetaItem(item);
	}
};

export const createCollectionItem = (data: RSSItem, type: string) => {
	const article = createMainArticle(data);

	return applyType(article, type);
};
