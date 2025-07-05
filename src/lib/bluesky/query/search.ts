import { AppBskyFeedPost } from "@atproto/api";
import { BlueSkyAgent } from "..";
import { BLUESKY_AUTHENTICATED_SERVICE_URL } from "./utils";

export type SearchPostsParams = {
	q: string; // Author DID
	sort?: "top" | "latest"; // Cursor for pagination
	until?: string; // Filter posts until this date
	since?: string; // Filter posts since this date
	mentions?: string; // Mentions - User @
	author?: string; // Author - User @
	lang?: string; // Language
	domain?: string; // Domain
	url?: string; // URL
	tag?: string[]; // Tag
	cursor?: string;
	limit?: number; // Number of posts to fetch
};

type SearchResponse = {
	posts: {
		uri: string; // Post URI
		record: AppBskyFeedPost.Record; // Post record
	}[];
	hitsTotal?: number;
	cursor?: string; // Cursor for pagination
};

export const convertSearchResponseToPostUris = (result: SearchResponse) => {
	let postUris: string[] = [];
	const posts = result.posts;
	// if (!result || !Array.isArray(result.posts)) return postUris; // Ensure posts is an array
	posts.forEach((post) => {
		if (!AppBskyFeedPost.isRecord(post.record)) return;
		// if (post && post.uri) {
		postUris.push(post.uri);
		// }
	});
	return postUris;
};

// Hashtags don't appear to work?
export const transformSearchParams = (params: SearchPostsParams) => {
	const { tag = [], ...rest } = params;
	let transformedTag = tag;
	if (typeof transformedTag === "string") {
		transformedTag = [transformedTag];
	}
	return { tag: transformedTag, ...rest };
};

export const searchPosts = async (params: SearchPostsParams) => {
	const blueSkyAgent = new BlueSkyAgent(BLUESKY_AUTHENTICATED_SERVICE_URL);
	await blueSkyAgent.login({
		identifier:
			process.env.BLUESKY_AUTHOR_IDENTIFIER || "datatattat.bsky.social",
		password: process.env.BLUESKY_AUTHOR_PASSWORD || "",
	});
	const transformedParams = transformSearchParams(params);

	try {
		const result = (await blueSkyAgent.searchPosts(
			transformedParams
		)) as SearchResponse;
		return convertSearchResponseToPostUris(result);
	} catch {
		console.error("Error searching posts:", params);
		return [];
	}
};
