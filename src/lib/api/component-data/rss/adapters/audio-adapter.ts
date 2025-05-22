import { getArticleBySrc } from "@/lib/mongo/actions/article";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { cloneDeep } from "@/utils/object";
import { filterLimit } from "../utils/limit";
import { saveOrUpdateArticle } from "@/actions/data/article/save-article";

export type PodcastRSSItem = {
	title: string;
	description: string;
	link: string;
	pubDate: string;
	creator?: string;

	itunes: {
		duration: string;
		episodeType: string;
		author: string;
		subtitle: string;
		summary: string;
		block: string;
		explicit: string;
	};
	content: {
		encoded: string;
	};

	guid: string;
	enclosure: {
		url: string;
		type?: string;
	};
};

export type PodcastRSSCollection = {
	feedUrl: string;
	items: PodcastRSSItem[];
	link?: string;
	title?: string;
	description?: string;
	lastBuildDate?: string;
	language?: string;
	copyright?: string;
	generator?: string;
	author?: string;
	image?: {
		url: string;
		title: string;
		link: string;
	};
	itunes: {
		owner: {
			name: string;
			email: string;
		};
		image: string;
		categories: string[];
		explicit: string;
		author: string;
		summary: string;
	};
};

export const convertDurationToSeconds = (duration: string) => {
	if (!duration) {
		return undefined;
	}
	// assuming that the durtion is given in seconds when it is a number
	if (!isNaN(Number(duration))) {
		return Number(duration);
	}
	// Assuming the duration is in the format "HH:MM:SS"
	const parts = duration.split(":").map(Number);
	let seconds = 0;

	if (parts.length === 3) {
		seconds += parts[0] * 3600; // Hours
		seconds += parts[1] * 60; // Minutes
		seconds += parts[2]; // Seconds
	} else if (parts.length === 2) {
		seconds += parts[0] * 60; // Minutes
		seconds += parts[1]; // Seconds
	} else if (parts.length === 1) {
		seconds += parts[0]; // Seconds
	}

	return seconds;
};

export const adaptItem = async (
	item: PodcastRSSItem,
	channel: PodcastRSSCollection
) => {
	const {
		title,
		description,
		link,
		pubDate,
		guid,
		enclosure,
		itunes,
		creator,
	} = item;

	const { url, type } = enclosure || {};

	if (!url) {
		return item;
	}

	const existingArticle = await getArticleBySrc(url);
	if (existingArticle) {
		return existingArticle;
	}

	const { duration, episodeType, author, summary } = itunes || {};

	const { itunes: collectionItunes, title: channelTitle } = channel || {};
	const {
		owner,
		image,
		categories: collectionCategories = [],
		explicit,
		author: collectionAuthor,
		summary: collectionSummary,
	} = collectionItunes || {};

	const article: CollectionItem = {
		title,
		src: url,
		description: description || summary,
		guid: guid,
		variant: "audio",

		avatar: {
			src: image || "",
			alt: channelTitle || "",
		},
		media: {
			duration: convertDurationToSeconds(duration),
			format: "podcast",
			type: type || "audio/mpeg",
			collectionTitle: creator || author,
		},
		details: {
			published: pubDate,
			publishers: [author],
			categories: [...collectionCategories],
			authors: [author],
		},
		// provider,
		// collectionType,
	};

	await saveOrUpdateArticle(article);
	return article;
};

export const audioAdapter = async (article: PodcastRSSCollection) => {
	console.log("audioAdapter", article);
	const { link, title, items = [], image, feedUrl } = article;

	const filteredItems = filterLimit(items) as PodcastRSSItem[];

	const promises = filteredItems.map((item) => {
		return adaptItem(item as unknown as PodcastRSSItem, article);
	});
	const articles = await Promise.all(promises);
	const collection = {
		link,
		feedUrl,
		title,
		items: articles,
		image,
	};
	return cloneDeep(collection) as PodcastRSSCollection;
};
