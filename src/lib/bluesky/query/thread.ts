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
// We need to properly type bluesky you fly by night hacker type
// struct is parent.parent NOR parent.post.parent.post like you might logically think
////////
// Do we need any protections etc here / stress this
////////////////////////////////////////////////////////////////////////////
/**
 * convertParentToPostUri - recursive function to convert parent posts to URIs
 * @param parent
 * @param uris
 * @returns uris
 */
const convertParentToPostUri = (parent: any, uris: string[] = []) => {
	const { post } = parent || {};

	if (!post) {
		return [...uris];
	}

	const { record } = post || {};

	if (!AppBskyFeedPost.isRecord(record)) return [...uris];
	return convertParentToPostUri(parent.parent, [post.uri, ...uris]);
};
//////////////////////////////////////////////////////////////////////

const convertThreadToPostUris = (thread: any) => {
	const { post, parent, replies: threadReplies } = thread;
	const replies = convertRepliesToPostUris(threadReplies);

	const parentUris = convertParentToPostUri(parent);

	if (!post || !AppBskyFeedPost.isRecord(post.record)) {
		throw new Error("Invalid post data in thread");
	}

	const uris = [...parentUris, post.uri, ...replies];
	return uris;
};

export const getPostThread = async (params: PostThreadParams) => {
	const blueSkyAgent = new BlueSkyAgent(BLUESKY_PUBLIC_SERVICE_URL);
	const { uri, depth = 6, parentHeight = 80 } = params;
	const { thread } = await blueSkyAgent.getPostThread(uri, depth, parentHeight);
	return convertThreadToPostUris(thread);
};
