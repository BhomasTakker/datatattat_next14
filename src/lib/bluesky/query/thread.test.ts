import {
	convertRepliesToPostUris,
	convertParentToPostUri,
	convertThreadToPostUris,
	getPostThread,
} from "./thread";

// Mock AppBskyFeedPost.isRecord
jest.mock("@atproto/api", () => ({
	AppBskyFeedPost: {
		isRecord: jest.fn(
			(record) => record && record.$type === "app.bsky.feed.post"
		),
	},
}));

// Mock BlueSkyAgent
jest.mock("../", () => ({
	BlueSkyAgent: jest.fn().mockImplementation(() => ({
		getPostThread: jest.fn((uri, depth, parentHeight) =>
			Promise.resolve({
				thread: mockThread,
			})
		),
	})),
}));

const mockPost = (uri: string) => ({
	uri,
	record: { $type: "app.bsky.feed.post" },
});

const mockReply = (uri: string) => ({
	post: mockPost(uri),
});

const mockThread = {
	post: mockPost("post:main"),
	parent: {
		post: mockPost("post:parent"),
		parent: {
			post: mockPost("post:grandparent"),
			parent: null,
		},
	},
	replies: [mockReply("post:reply1"), mockReply("post:reply2")],
};

describe("thread.ts", () => {
	describe("convertRepliesToPostUris", () => {
		it("returns empty array if replies is not an array", () => {
			expect(convertRepliesToPostUris(null as any)).toEqual([]);
			expect(convertRepliesToPostUris(undefined as any)).toEqual([]);
			expect(convertRepliesToPostUris({} as any)).toEqual([]);
		});

		it("returns post uris from valid replies", () => {
			const replies = [
				{ post: { uri: "uri1", record: { $type: "app.bsky.feed.post" } } },
				{ post: { uri: "uri2", record: { $type: "app.bsky.feed.post" } } },
			];
			expect(convertRepliesToPostUris(replies)).toEqual(["uri1", "uri2"]);
		});

		it("skips replies with invalid post record", () => {
			const replies = [
				{ post: { uri: "uri1", record: { $type: "app.bsky.feed.post" } } },
				{ post: { uri: "uri2", record: { $type: "invalid.type" } } },
			];
			expect(convertRepliesToPostUris(replies)).toEqual(["uri1"]);
		});
	});

	describe("convertParentToPostUri", () => {
		it("returns empty array if parent is null", () => {
			expect(convertParentToPostUri(null)).toEqual([]);
		});

		it("returns uris recursively from parent chain", () => {
			const parent = {
				post: { uri: "uri1", record: { $type: "app.bsky.feed.post" } },
				parent: {
					post: { uri: "uri2", record: { $type: "app.bsky.feed.post" } },
					parent: null,
				},
			};
			expect(convertParentToPostUri(parent)).toEqual(["uri2", "uri1"]);
		});

		it("skips invalid parent records", () => {
			const parent = {
				post: { uri: "uri1", record: { $type: "invalid.type" } },
				parent: null,
			};
			expect(convertParentToPostUri(parent)).toEqual([]);
		});
	});

	describe("convertThreadToPostUris", () => {
		it("throws if post is missing or invalid", () => {
			expect(() => convertThreadToPostUris({})).toThrow();
			expect(() =>
				convertThreadToPostUris({ post: { record: { $type: "invalid.type" } } })
			).toThrow();
		});

		it("returns uris in correct order", () => {
			const thread = {
				post: { uri: "main", record: { $type: "app.bsky.feed.post" } },
				parent: {
					post: { uri: "parent", record: { $type: "app.bsky.feed.post" } },
					parent: null,
				},
				replies: [
					{ post: { uri: "reply1", record: { $type: "app.bsky.feed.post" } } },
					{ post: { uri: "reply2", record: { $type: "app.bsky.feed.post" } } },
				],
			};
			expect(convertThreadToPostUris(thread)).toEqual([
				"parent",
				"main",
				"reply1",
				"reply2",
			]);
		});
	});

	describe("getPostThread", () => {
		it("calls BlueSkyAgent.getPostThread and returns uris", async () => {
			const uris = await getPostThread({ uri: "post:main" });
			expect(uris).toEqual([
				"post:grandparent",
				"post:parent",
				"post:main",
				"post:reply1",
				"post:reply2",
			]);
		});
	});
});
