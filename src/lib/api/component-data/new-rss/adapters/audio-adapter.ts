import { RSSChannelType } from "@/types/data-structures/rss";
import { cloneDeep } from "@/utils/object";

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

const convertDurationToSeconds = (duration: string) => {
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

const adaptItem = (item: PodcastRSSItem, channel: PodcastRSSCollection) => {
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

	const newItem = {
		title,
		src: enclosure.url,
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
			type: enclosure.type || "audio/mpeg",
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

	// saveArticle
	return newItem;
};

export const audioAdapter = async (article: PodcastRSSCollection) => {
	console.log("audioAdapter", article);
	const { link, title, items = [], image, feedUrl } = article;

	const promises = items.map((item) => {
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
	return collection;
};
