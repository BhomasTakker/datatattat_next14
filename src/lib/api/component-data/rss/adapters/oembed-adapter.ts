import { RSSChannelType } from "@/types/data-structures/rss";
import { oembedFetchList } from "../../oembed/oembed-fetch-list";
import { WithQuery } from "@/types/component";
import { OEmbed } from "@/types/data-structures/oembed";

enum Sources {
	REDDIT = "reddit",
	TWITTER = "twitter",
	BLUESKY = "bluesky",
	DEFAULT = "default",
}
type OembedListComponentProps = {
	items: OEmbed[];
	script: string;
};

const redditAdapter = async (
	data: RSSChannelType,
): Promise<OembedListComponentProps | null> => {
	const { items = [] } = data;

	const params = {
		variant: "reddit",
		direction: "normal",
		collection: items.map((item) => ({ url: item.link })),
	};

	const adaptedItems = await oembedFetchList({ params } as WithQuery);
	return adaptedItems;
};
const blueskyAdapter = async (data: RSSChannelType) => {
	const { items = [] } = data;

	const collection = items.map((item) => {
		// Extract the Bluesky post URI from the RSS item link
		const url = item.link || "";

		// Regex to extract user profile (aljazeera.com)
		const profileMatch = url.match(/bsky\.app\/profile\/([^\/]+)/);
		const userProfile = profileMatch ? profileMatch[1] : ""; // 'aljazeera.com'

		// Regex to extract postId (3mdsgu73gv72e)
		const postIdMatch = url.match(/\/post\/([^\/]+)/);
		const postId = postIdMatch ? postIdMatch[1] : ""; // '3mdsgu73gv72e'

		return { account: userProfile, postId: postId };
	});

	const params = {
		variant: "bluesky",
		direction: "normal",
		collection: collection,
	};

	const adaptedItems = await oembedFetchList({ params } as WithQuery);
	return adaptedItems;
};
const twitterAdapter = async (data: RSSChannelType) => {
	return Promise.resolve(data);
};
const defaultAdapter = async (data: RSSChannelType) => {
	return Promise.resolve(data);
};

const oembedAdapters = new Map<string, Function>([
	[Sources.REDDIT, redditAdapter],
	[Sources.TWITTER, twitterAdapter],
	[Sources.BLUESKY, blueskyAdapter],
	[Sources.DEFAULT, defaultAdapter],
]);

const determineOEmbedSource = (url: string) => {
	switch (true) {
		case url.includes("reddit.com"):
			return Sources.REDDIT;
		case url.includes("twitter.com"):
			return Sources.TWITTER;
		case url.includes("bsky.app"):
			return Sources.BLUESKY;
		default:
			return Sources.DEFAULT;
	}
};

export const oembedAdapter = async (data: RSSChannelType) => {
	const { link, feedUrl, items } = data;

	const oembedIdentifier = link || feedUrl || "";
	const oembedSource = determineOEmbedSource(oembedIdentifier);

	const adapter = oembedAdapters.get(oembedSource) || defaultAdapter;

	const adaptedData = await adapter(data);

	return adaptedData;
};
