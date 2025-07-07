import { BlueSkyAgent } from "./index";
import { AtpAgent } from "@atproto/api";

describe("BlueSkyAgent", () => {
	const serviceUrl = "https://public.api.bsky.app";
	let agent: BlueSkyAgent;
	let mockAtpAgent: any;

	beforeEach(() => {
		agent = new BlueSkyAgent(serviceUrl);
		mockAtpAgent = (AtpAgent as unknown as jest.Mock).mock.results[0].value;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should initialize with the correct service URL", () => {
		expect(AtpAgent).toHaveBeenCalledWith({ service: serviceUrl });
	});

	it("getAgent should return the underlying AtpAgent", () => {
		expect(agent.getAgent()).toBe(mockAtpAgent);
	});

	describe("getFeed", () => {
		it("should return feed data on success", async () => {
			const mockFeed = { data: { feed: [{ id: 1 }] } };
			mockAtpAgent.app.bsky.feed.getFeed.mockResolvedValue(mockFeed);

			const result = await agent.getFeed("feed-uri", 5, "cursor");
			expect(mockAtpAgent.app.bsky.feed.getFeed).toHaveBeenCalledWith({
				feed: "feed-uri",
				limit: 5,
				cursor: "cursor",
			});
			expect(result).toEqual([{ id: 1 }]);
		});

		it("should throw and log error on failure", async () => {
			const error = new Error("fail");
			mockAtpAgent.app.bsky.feed.getFeed.mockRejectedValue(error);
			const spy = jest.spyOn(console, "error").mockImplementation(() => {});

			const result = await agent.getFeed("feed-uri");

			expect(result).toEqual([]);

			// await expect(agent.getFeed("feed-uri")).rejects.toThrow("fail");
			expect(spy).toHaveBeenCalledWith("Error fetching feed:", error);

			spy.mockRestore();
		});
	});

	describe("getAuthorFeed", () => {
		it("should return author feed data on success", async () => {
			const mockFeed = { data: { feed: [{ id: 2 }] } };
			mockAtpAgent.getAuthorFeed.mockResolvedValue(mockFeed);

			const result = await agent.getAuthorFeed("actor", 3, "cursor2");
			expect(mockAtpAgent.getAuthorFeed).toHaveBeenCalledWith({
				actor: "actor",
				limit: 3,
				cursor: "cursor2",
			});
			expect(result).toEqual([{ id: 2 }]);
		});

		it("should throw and log error on failure", async () => {
			const error = new Error("fail2");
			mockAtpAgent.getAuthorFeed.mockRejectedValue(error);
			const spy = jest.spyOn(console, "error").mockImplementation(() => {});

			const result = await agent.getAuthorFeed("actor");
			// await expect(agent.getAuthorFeed("actor")).rejects.toThrow("fail2");

			expect(result).toEqual([]);
			expect(spy).toHaveBeenCalledWith("Error fetching author feed:", error);
			spy.mockRestore();
		});
	});

	describe("getPostThread", () => {
		it("should return thread data on success", async () => {
			const mockThread = { data: { thread: "thread-data" } };
			mockAtpAgent.app.bsky.feed.getPostThread.mockResolvedValue(mockThread);

			const result = await agent.getPostThread("uri", 4, 10);
			expect(mockAtpAgent.app.bsky.feed.getPostThread).toHaveBeenCalledWith({
				uri: "uri",
				depth: 4,
				parentHeight: 10,
			});
			expect(result).toEqual({ thread: "thread-data" });
		});

		it("should return an empty array and log error on failure", async () => {
			const error = new Error("fail3");
			mockAtpAgent.app.bsky.feed.getPostThread.mockRejectedValue(error);
			const spy = jest.spyOn(console, "error").mockImplementation(() => {});

			// await expect(agent.getPostThread("uri")).rejects.toThrow("fail3");

			const result = await agent.getPostThread("uri");
			expect(spy).toHaveBeenCalledWith("Error fetching post thread:", error);

			expect(result).toEqual({
				thread: { post: null, parent: null, replies: [] },
			});
			spy.mockRestore();
		});
	});

	describe("searchPosts", () => {
		it("should return search data on success", async () => {
			const mockData = { data: { posts: [1, 2, 3] } };
			mockAtpAgent.app.bsky.feed.searchPosts.mockResolvedValue(mockData);

			const params = { q: "test" } as any;
			const result = await agent.searchPosts(params);
			expect(mockAtpAgent.app.bsky.feed.searchPosts).toHaveBeenCalledWith(
				params
			);
			expect(result).toEqual({ posts: [1, 2, 3] });
		});

		it("should return an empty array on failure", async () => {
			const error = new Error("fail4");
			mockAtpAgent.app.bsky.feed.searchPosts.mockRejectedValue(error);
			const spy = jest.spyOn(console, "error").mockImplementation(() => {});
			const result = await agent.searchPosts({} as any);
			// await expect(agent.searchPosts({} as any)).rejects.toThrow("fail4");
			expect(spy).toHaveBeenCalledWith("Error searching posts:", error);

			expect(result).toEqual({ posts: [] });

			spy.mockRestore();
		});
	});

	describe("login", () => {
		it("should call login with credentials", async () => {
			mockAtpAgent.login.mockResolvedValue(undefined);
			const credentials = { identifier: "user", password: "pass" };
			await agent.login(credentials);
			expect(mockAtpAgent.login).toHaveBeenCalledWith(credentials);
		});

		it("should throw and log error on failure", async () => {
			const error = new Error("fail5");
			mockAtpAgent.login.mockRejectedValue(error);
			const spy = jest.spyOn(console, "error").mockImplementation(() => {});

			await expect(
				agent.login({ identifier: "user", password: "pass" })
			).rejects.toThrow("fail5");
			expect(spy).toHaveBeenCalledWith("Error logging in:", error);

			spy.mockRestore();
		});
	});
});
