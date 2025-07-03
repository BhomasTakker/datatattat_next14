import { AppBskyFeedPost } from "@atproto/api";
import { BlueSkyAgent } from "..";
import { BLUESKY_PUBLIC_SERVICE_URL } from "./utils";

export type PostThreadParams = {
	uri: string; // Post URI
	depth?: number; // Depth of replies to fetch
	parentHeight?: number; // Height of the parent post
};

const convertRepliesToPostUris = (replies: any[]) => {
	let postUris: string[] = [];
	if (!Array.isArray(replies)) return postUris; // Ensure replies is an array
	replies.forEach((reply: any) => {
		const post = reply.post as AppBskyFeedPost.Record;
		if (!AppBskyFeedPost.isRecord(post.record)) return;
		postUris.push(post.uri as string);
	});
	return postUris;
};

//////////
// Todo:
////////////////////////////////////////////////////////////////////////////
// this will only return the direct parent - we need to recurse all the way up to the root
// then create a list
// filter
////////////////////////////////////////////////////////////////////////////
const convertParentToPostUri = (parent: any) => {
	const { post } = parent || {};
	const { record } = post || {};

	if (!AppBskyFeedPost.isRecord(record)) return null;
	return post.uri as string;
};

const convertThreadToPostUris = (thread: any) => {
	const { post, parent, replies: threadReplies } = thread;
	const replies = convertRepliesToPostUris(threadReplies);
	const parentUri = convertParentToPostUri(parent);
	if (!post || !AppBskyFeedPost.isRecord(post.record)) {
		throw new Error("Invalid post data in thread");
		return [];
	}

	const uris = [parentUri, post.uri, ...replies];
	return uris;
};

export const getPostThread = async (params: PostThreadParams) => {
	const blueSkyAgent = new BlueSkyAgent(BLUESKY_PUBLIC_SERVICE_URL);
	const { uri, depth = 6, parentHeight = 80 } = params;
	const { thread } = await blueSkyAgent.getPostThread(uri, depth, parentHeight);
	return convertThreadToPostUris(thread);
};
