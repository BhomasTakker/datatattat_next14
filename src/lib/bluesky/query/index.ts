import { PostThreadParams, SearchPostsParams } from "@/types/bluesky";
import { FeedParams, getFeed, getAuthorFeed, AuthorFeedParams } from "./feed";
import { searchPosts } from "./search";
import { getPostThread } from "./thread";
import { BlueskyVariant } from "./utils";
import { blueskyOembedByUri } from "@/lib/api/component-data/oembed/options/bluesky";
import { fetchOembedList } from "@/lib/api/component-data/oembed/utils";
import { OEmbed } from "@/types/data-structures/oembed";

type BlueSkyFectchParams = {
	variant?: BlueskyVariant; // Type of query to perform
	feed?: string; // Feed URI
	actor?: string; // Author DID
	uri?: string; // Post URI
	cursor?: string; // Cursor for pagination
	limit?: number; // Number of posts to fetch
	depth?: number; // Depth of replies to fetch
	parentHeight?: number; // Height of the parent post
};

export const blueSkyFetch = async (params: BlueSkyFectchParams) => {
	const { variant = BlueskyVariant.Feed, ...fetchParams } = params;

	let items: string[] = [];

	switch (variant) {
		case BlueskyVariant.Feed:
			{
				//feed: at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot
				items = await getFeed(fetchParams as FeedParams);
			}
			break;
		case BlueskyVariant.AuthorFeed:
			{
				// https://docs.bsky.app/docs/tutorials/viewing-feeds#author-feeds
				// actor: did:plc:kkf4naxqmweop7dv4l2iqqf5
				items = await getAuthorFeed(fetchParams as AuthorFeedParams);
			}
			break;
		case BlueskyVariant.Thread:
			{
				// uri: at://did:plc:uqgv3rourwvvqouzhihorpbl/app.bsky.feed.post/3lstpv37vfs2v
				items = await getPostThread(fetchParams as PostThreadParams);
			}
			break;
		case BlueskyVariant.Search:
			{
				items = await searchPosts(fetchParams as SearchPostsParams);
			}
			break;
		default:
			items = [];
	}

	const { script, createUrl } = blueskyOembedByUri;
	const results = await fetchOembedList(items, createUrl);

	const filteredResults = results.filter((item) => item !== null) as OEmbed[];

	return {
		items: filteredResults,
		script: script,
	};
};
