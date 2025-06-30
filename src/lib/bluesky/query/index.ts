import { AppBskyFeedPost, AtpAgent } from "@atproto/api";

export const blueSkyFetch = async (params: any) => {
	const blueSkyAgent = new AtpAgent({
		service: "https://public.api.bsky.app",
	});
	// const feeds = await blueSkyAgent.app.bsky.unspecced.getPopularFeedGenerators({
	// 	limit: 10,
	// });
	const feed = await blueSkyAgent.app.bsky.feed.getFeed({
		feed: "at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot",
		limit: 10,
	});

	feed.data.feed.forEach((item: any) => {
		const { likeCount, replyCount, record, embed } = item.post;

		if (record.embed.video) {
			console.log("Video embed found:", record.embed.video);
		}
	});

	const uris = feed.data.feed.map((item: any) => {
		const post = item.post as AppBskyFeedPost.Record;
		if (!AppBskyFeedPost.isRecord(post.record)) return null;
		return post.uri;
	});

	// I think what we can expect is a list of posts in most circumstances
	// We can then use those posts to effectively cretae a feed of
	// oembd components IF bluesky oembed does not have a feed endpoint
	return {
		error: null,
		test: "HELLO BLUESKY!",
		// This check isn't working it seems
		// fix me and clean
		items: uris.filter((uri: string | null) => uri !== null),
	};
};
