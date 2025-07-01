import { AppBskyFeedPost } from "@atproto/api";
import { BlueSkyAgent } from "..";
import { BLUESKY_SERVICE_URL } from "./utils";
import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

const convertFeedToPostUris = (feed: FeedViewPost[]) => {
	let postUris: string[] = [];
	feed.forEach((item: any) => {
		const post = item.post as AppBskyFeedPost.Record;
		if (!AppBskyFeedPost.isRecord(post.record)) return;
		postUris.push(post.uri as string);
	});
	return postUris;
};

export type FeedParams = {
	feed: string; // Feed URI
	cursor?: string; // Cursor for pagination
	limit?: number; // Number of posts to fetch
};
export const getFeed = async (params: FeedParams) => {
	const blueSkyAgent = new BlueSkyAgent(BLUESKY_SERVICE_URL);
	const { feed, cursor = "", limit = 10 } = params;
	const result = await blueSkyAgent.getFeed(feed, limit, cursor);
	return convertFeedToPostUris(result);
};

export type AuthorFeedParams = {
	actor: string; // Author DID
	cursor?: string; // Cursor for pagination
	limit?: number; // Number of posts to fetch
};

export const getAuthorFeed = async (params: AuthorFeedParams) => {
	const blueSkyAgent = new BlueSkyAgent(BLUESKY_SERVICE_URL);
	const { actor, cursor = "", limit = 10 } = params;
	const feed = await blueSkyAgent.getAuthorFeed(actor, limit, cursor);
	return convertFeedToPostUris(feed);
};
