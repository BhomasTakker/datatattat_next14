import { getFeed, getAuthorFeed, FeedParams, AuthorFeedParams } from "./feed";
import { BlueSkyAgent } from "..";
import { AppBskyFeedPost } from "@atproto/api";

// Mock dependencies
jest.mock("..", () => ({
	BlueSkyAgent: jest.fn().mockImplementation(() => ({
		getFeed: jest.fn(),
		getAuthorFeed: jest.fn(),
	})),
}));
jest.mock("./utils", () => ({
	BLUESKY_PUBLIC_SERVICE_URL: "https://bsky.social",
}));

describe("feed.ts", () => {
	const mockFeedViewPost = (uri: string) => ({
		post: {
			record: {},
			uri,
		},
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("getFeed", () => {
		it("should return post URIs for valid feed items", async () => {
			const mockFeed = [
				mockFeedViewPost("at://post1"),
				mockFeedViewPost("at://post2"),
			];
			(AppBskyFeedPost.isRecord as unknown as jest.Mock).mockReturnValue(true);
			(BlueSkyAgent as jest.Mock).mockImplementation(() => ({
				getFeed: jest.fn().mockResolvedValue(mockFeed),
			}));

			const params: FeedParams = { feed: "feed-uri" };
			const result = await getFeed(params);

			expect(result).toEqual(["at://post1", "at://post2"]);
			expect(BlueSkyAgent).toHaveBeenCalledWith("https://bsky.social");
		});

		it("should skip invalid feed items", async () => {
			const mockFeed = [
				mockFeedViewPost("at://post1"),
				mockFeedViewPost("at://post2"),
			];
			(AppBskyFeedPost.isRecord as unknown as jest.Mock)
				.mockReturnValueOnce(false)
				.mockReturnValueOnce(true);
			(BlueSkyAgent as jest.Mock).mockImplementation(() => ({
				getFeed: jest.fn().mockResolvedValue(mockFeed),
			}));

			const params: FeedParams = { feed: "feed-uri" };
			const result = await getFeed(params);

			expect(result).toEqual(["at://post2"]);
		});

		it("should use default values for cursor and limit", async () => {
			(AppBskyFeedPost.isRecord as unknown as jest.Mock).mockReturnValue(true);
			(BlueSkyAgent as jest.Mock).mockImplementation(() => ({
				getFeed: jest.fn().mockResolvedValue([]),
			}));

			const params: FeedParams = { feed: "feed-uri" };
			await getFeed(params);

			const agentInstance = (BlueSkyAgent as jest.Mock).mock.results[0].value;
			expect(agentInstance.getFeed).toHaveBeenCalledWith("feed-uri", 10, "");
		});
	});

	describe("getAuthorFeed", () => {
		it("should return post URIs for valid author feed items", async () => {
			const mockFeed = [
				mockFeedViewPost("at://authorpost1"),
				mockFeedViewPost("at://authorpost2"),
			];
			(AppBskyFeedPost.isRecord as unknown as jest.Mock).mockReturnValue(true);
			(BlueSkyAgent as jest.Mock).mockImplementation(() => ({
				getAuthorFeed: jest.fn().mockResolvedValue(mockFeed),
			}));

			const params: AuthorFeedParams = { actor: "did:plc:123" };
			const result = await getAuthorFeed(params);

			expect(result).toEqual(["at://authorpost1", "at://authorpost2"]);
			expect(BlueSkyAgent).toHaveBeenCalledWith("https://bsky.social");
		});

		it("should use default values for cursor and limit in getAuthorFeed", async () => {
			(AppBskyFeedPost.isRecord as unknown as jest.Mock).mockReturnValue(true);
			(BlueSkyAgent as jest.Mock).mockImplementation(() => ({
				getAuthorFeed: jest.fn().mockResolvedValue([]),
			}));

			const params: AuthorFeedParams = { actor: "did:plc:123" };
			await getAuthorFeed(params);

			const agentInstance = (BlueSkyAgent as jest.Mock).mock.results[0].value;
			expect(agentInstance.getAuthorFeed).toHaveBeenCalledWith(
				"did:plc:123",
				10,
				""
			);
		});

		it("should skip invalid author feed items", async () => {
			const mockFeed = [
				mockFeedViewPost("at://authorpost1"),
				mockFeedViewPost("at://authorpost2"),
			];
			(AppBskyFeedPost.isRecord as unknown as jest.Mock)
				.mockReturnValueOnce(false)
				.mockReturnValueOnce(true);
			(BlueSkyAgent as jest.Mock).mockImplementation(() => ({
				getAuthorFeed: jest.fn().mockResolvedValue(mockFeed),
			}));

			const params: AuthorFeedParams = { actor: "did:plc:123" };
			const result = await getAuthorFeed(params);

			expect(result).toEqual(["at://authorpost2"]);
		});
	});
});
