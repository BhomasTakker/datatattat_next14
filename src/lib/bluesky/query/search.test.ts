import {
	convertSearchResponseToPostUris,
	transformSearchParams,
	searchPosts,
	SearchPostsParams,
} from "./search";
import { AppBskyFeedPost } from "@atproto/api";
import { BlueSkyAgent } from "..";

// Mock BlueSkyAgent and its methods
jest.mock("..", () => {
	return {
		BlueSkyAgent: jest.fn().mockImplementation(() => ({
			login: jest.fn().mockResolvedValue(undefined),
			searchPosts: jest.fn(),
		})),
	};
});

describe("search.ts", () => {
	describe("convertSearchResponseToPostUris", () => {
		it("should return an array of post URIs for valid records", () => {
			const validRecord = { $type: "app.bsky.feed.post", text: "Hello" };
			(AppBskyFeedPost.isRecord as any) = jest
				.fn()
				.mockImplementation((rec) => rec === validRecord);

			const response = {
				posts: [
					{ uri: "uri:1", record: validRecord },
					{ uri: "uri:2", record: validRecord },
				],
			};
			expect(convertSearchResponseToPostUris(response as any)).toEqual([
				"uri:1",
				"uri:2",
			]);
		});

		it("should skip posts with invalid records", () => {
			const validRecord = { $type: "app.bsky.feed.post", text: "Hello" };
			const invalidRecord = { $type: "other.type", text: "Nope" };
			(AppBskyFeedPost.isRecord as any) = jest
				.fn()
				.mockImplementation((rec) => rec === validRecord);

			const response = {
				posts: [
					{ uri: "uri:1", record: validRecord },
					{ uri: "uri:2", record: invalidRecord },
				],
			};
			expect(convertSearchResponseToPostUris(response as any)).toEqual([
				"uri:1",
			]);
		});

		it("should return an empty array if posts is empty", () => {
			(AppBskyFeedPost.isRecord as any) = jest.fn();
			expect(convertSearchResponseToPostUris({ posts: [] })).toEqual([]);
		});
	});

	describe("transformSearchParams", () => {
		it("should convert string tag to array", () => {
			const params = { q: "test", tag: "foo" } as any;
			expect(transformSearchParams(params)).toEqual({
				q: "test",
				tag: ["foo"],
			});
		});

		it("should keep tag as array if already array", () => {
			const params = { q: "test", tag: ["foo", "bar"] };
			expect(transformSearchParams(params)).toEqual({
				q: "test",
				tag: ["foo", "bar"],
			});
		});

		it("should default tag to empty array if not provided", () => {
			const params = { q: "test" };
			expect(transformSearchParams(params)).toEqual({ tag: [], q: "test" });
		});
	});

	describe("searchPosts", () => {
		const mockLogin = jest.fn().mockResolvedValue(undefined);
		const mockSearchPosts = jest.fn();

		beforeEach(() => {
			(BlueSkyAgent as jest.Mock).mockImplementation(() => ({
				login: mockLogin,
				searchPosts: mockSearchPosts,
			}));
			jest.spyOn(console, "error").mockImplementation(() => {});
		});

		afterEach(() => {
			jest.clearAllMocks();
		});

		it("should return post URIs from searchPosts result", async () => {
			const validRecord = { $type: "app.bsky.feed.post", text: "Hello" };
			(AppBskyFeedPost.isRecord as any) = jest.fn().mockReturnValue(true);

			mockSearchPosts.mockResolvedValue({
				posts: [
					{ uri: "uri:1", record: validRecord },
					{ uri: "uri:2", record: validRecord },
				],
			});

			const params: SearchPostsParams = { q: "test" };
			const result = await searchPosts(params);
			expect(result).toEqual(["uri:1", "uri:2"]);
			expect(mockLogin).toHaveBeenCalled();
			expect(mockSearchPosts).toHaveBeenCalled();
		});

		it("should return empty array and log error on failure", async () => {
			mockSearchPosts.mockRejectedValue(new Error("fail"));
			const params: SearchPostsParams = { q: "test" };
			const result = await searchPosts(params);
			expect(result).toEqual([]);
			expect(console.error).toHaveBeenCalledWith(
				"Error searching posts:",
				params
			);
		});
	});
});
