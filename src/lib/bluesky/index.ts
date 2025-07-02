import { AppBskyFeedNS, AppBskyNS, AtpAgent } from "@atproto/api";
import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

// This should be more general - pass servivce as a parameter
// the at protocol is anew protocol - like rss etc
// this should ultimately be a bass
// and COULD be the base of our own agent
export const agent = new AtpAgent({
	service: "https://public.api.bsky.app",
});

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
			throw error;
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
			throw error;
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
			throw error;
		}
	}
}
