import { AppBskyFeedPost } from "@atproto/api";
import { BlueSkyAgent } from "..";
import { BLUESKY_PUBLIC_SERVICE_URL } from "./utils";
import { BlueSkyThread, PostThreadParams } from "@/types/bluesky";

export const convertRepliesToPostUris = (replies: any[]) => {
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
export const convertParentToPostUri = (
	parent: any,
	uris: string[] = []
): string[] => {
	const { post } = parent || {};

	if (!post) {
		return [...uris];
	}

	const { record } = post || {};

	if (!AppBskyFeedPost.isRecord(record)) return [...uris];
	return convertParentToPostUri(parent.parent, [post.uri, ...uris]);
};
//////////////////////////////////////////////////////////////////////

export const convertThreadToPostUris = (thread: BlueSkyThread): string[] => {
	if (!thread || !thread.post) {
		console.error("Invalid thread data");
		return [];
	}
	const { post, parent, replies: threadReplies } = thread;
	const replies = convertRepliesToPostUris(threadReplies || []);

	const parentUris = convertParentToPostUri(parent);

	if (!post || !AppBskyFeedPost.isRecord(post.record)) {
		console.error("Invalid post data in thread");
		return [];
	}

	const uris = [...parentUris, post.uri, ...replies];
	return uris;
};

export const getPostThread = async (params: PostThreadParams) => {
	const blueSkyAgent = new BlueSkyAgent(BLUESKY_PUBLIC_SERVICE_URL);
	const { uri, depth = 6, parentHeight = 80 } = params;
	const { thread } = await blueSkyAgent.getPostThread(uri, depth, parentHeight);
	// We are protecting so caste 'should' be okay
	// real type is ThreadViewPost - we have 'simplified'
	return convertThreadToPostUris(thread as unknown as BlueSkyThread);
};
