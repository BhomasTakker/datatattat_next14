import { SearchPostsParams } from "@/types/bluesky";
import { AppBskyFeedNS, AppBskyFeedSearchPosts, AtpAgent } from "@atproto/api";
import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

// This should be more general - pass servivce as a parameter
// the at protocol is anew protocol - like rss etc
// this should ultimately be a bass
// and COULD be the base of our own agent
export const agent = new AtpAgent({
	service: "https://public.api.bsky.app",
});

//////////////////////////////////////////////////////
// NOTE:- This is a very basic agent for BlueSky.
// We could very well include the option for i.e.
// agent.app.bsky.graph.getLists from a given user
// let user select the list they want to view
// and then use that to get the feed for that list.
// There are a hundred other things we could do with this agent.
///////////////////////////////////////////////////////

// Really we should extend a BlueSky agent from an AtpAgent but...
export class BlueSkyAgent {
	private agent: AtpAgent;
	private blueSkyFeed: AppBskyFeedNS;

	constructor(serviceUrl: string) {
		this.agent = new AtpAgent({
			service: serviceUrl,
		});
		this.blueSkyFeed = this.agent.app.bsky.feed;
	}

	public getAgent(): AtpAgent {
		return this.agent;
	}

	public async getFeed(
		feedUri: string,
		limit: number = 10,
		cursor: string = ""
	): Promise<FeedViewPost[]> {
		try {
			const feed = await this.blueSkyFeed.getFeed({
				feed: feedUri,
				limit,
				cursor,
			});
			return feed.data.feed;
		} catch (error) {
			console.error("Error fetching feed:", error);
			// throw error;
			return [];
		}
	}

	public async getAuthorFeed(
		actor: string,
		limit: number = 10,
		cursor: string = ""
	): Promise<FeedViewPost[]> {
		try {
			const feed = await this.agent.getAuthorFeed({
				actor,
				limit,
				cursor,
			});
			return feed.data.feed;
		} catch (error) {
			console.error("Error fetching author feed:", error);
			// throw error;
			return [];
		}
	}

	public async getPostThread(
		uri: string,
		depth: number = 6,
		parentHeight: number = 80
	) {
		try {
			const thread = await this.blueSkyFeed.getPostThread({
				uri,
				depth,
				parentHeight,
			});
			return thread.data;
		} catch (error) {
			console.error("Error fetching post thread:", error);
			// throw error; / incorrect resonse,#..
			return { thread: { post: null, parent: null, replies: [] } };
		}
	}

	// Response Schema
	// {
	// 	cursor: string,
	// 	hitsTotal: integer,
	// 	posts: app.bsky.feed.defs.postView[]
	// }
	public async searchPosts(params: SearchPostsParams) {
		try {
			const response = await this.blueSkyFeed.searchPosts(params);
			return response.data;
		} catch (error) {
			console.error("Error searching posts:", error);
			// throw error; / check response... / incorrect response
			return { posts: [] };
		}
	}

	public async login(credentials: {
		identifier: string;
		password: string;
	}): Promise<void> {
		try {
			await this.agent.login({
				identifier: credentials.identifier,
				password: credentials.password,
			});
		} catch (error) {
			console.error("Error logging in:", error);
			throw error;
		}
	}
}
