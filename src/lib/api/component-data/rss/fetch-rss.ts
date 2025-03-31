import {
	getArticleCollectionByFeed,
	saveOrCreateArticleCollectionByFeed,
} from "@/lib/mongo/actions/articleCollection";
import { fetchWithCache } from "@/lib/redis/redis-fetch";
import { RSSArticleCollection } from "@/types/data-structures/collection/collection";
import { WithQuery } from "@/types/page";
import { cloneDeep } from "@/utils/object";
import { isStringValidURL } from "@/utils/url";
import { rssParse } from "./rss-parse";
import { articleAdapter } from "./adapters/article-adapter";
import { videoAdapter } from "./adapters/video-adapter";
import { audioAdapter, PodcastRSSCollection } from "./adapters/audio-adapter";
import { RSSChannelType } from "@/types/data-structures/rss";
import { YouTubeRSSChannel } from "./types";

// temp
type ArticleVariant = "article" | "video" | "audio";

type RssParams = {
	url: string;
	variant: ArticleVariant;
};

type FetchRSSCollection = {
	url: string;
	variant: ArticleVariant;
};

type RSSType = RSSChannelType | YouTubeRSSChannel | PodcastRSSCollection;

const CACHE = 60 * 60 * 24;

type Adapters =
	| typeof articleAdapter
	| typeof videoAdapter
	| typeof audioAdapter;

const adapters = new Map<string, Adapters>([
	["article", articleAdapter],
	["video", videoAdapter],
	["audio", audioAdapter],
]);

export const getParserCustomFields = (type: string) => {
	if (type === "video") {
		return {
			item: ["media:group"],
		};
	}
	return {};
};

const getCollection = async ({ url, variant }: FetchRSSCollection) => {
	const articleCollection = await getArticleCollectionByFeed(url);
	if (articleCollection) {
		return cloneDeep(articleCollection) as RSSArticleCollection;
	}

	const loadedCollection = (await rssParse(
		url,
		getParserCustomFields(variant)
	)) as RSSType;
	if (!loadedCollection) {
		return Promise.reject("Error fetching collection");
	}

	// format return depending upon variant
	const adapter = adapters.get(variant);
	if (!adapter) {
		console.log("Invalid variant", variant);
		return Promise.reject("Invalid variant");
	}

	// @ts-expect-error - how would we type this?
	const convertedCollection = await adapter(loadedCollection);

	// Save collection in db
	// Need to save to cache
	saveOrCreateArticleCollectionByFeed(convertedCollection);

	return convertedCollection;
};

const fetchRSSCollection = async ({ url, variant }: FetchRSSCollection) => {
	const isValid = isStringValidURL(url);
	if (!isValid) {
		return {
			error: "Invalid URL",
		};
	}

	try {
		const collection = fetchWithCache(
			() => getCollection({ url, variant }),
			url,
			CACHE
		); // 1 day
		return collection;
	} catch {
		console.error("Error fetching rss collectionPromises");
		return {
			error: "Error fetching rss collectionPromises",
		};
	}
};

export const fetchRss = async (query: WithQuery) => {
	const { params } = query;
	const { url, variant } = params as RssParams;

	if (!url) {
		return {
			error: "No url provided",
		};
	}

	const collection = await fetchRSSCollection({ url, variant });
	return collection;
};
