import { blueSkyFetch } from "./index";
import { getFeed, getAuthorFeed } from "./feed";
import { searchPosts } from "./search";
import { getPostThread } from "./thread";
import { BlueskyVariant } from "./utils";
import { blueskyOembedByUri } from "../../api/component-data/oembed/options/bluesky";
import { fetchOembedList } from "../../api/component-data/oembed/utils";
import { OEmbed } from "../../../types/data-structures/oembed";

// Mock dependencies
jest.mock("./feed", () => ({
	getFeed: jest.fn(),
	getAuthorFeed: jest.fn(),
}));

jest.mock("./search", () => ({
	searchPosts: jest.fn(),
}));

jest.mock("./thread", () => ({
	getPostThread: jest.fn(),
}));

jest.mock("../../api/component-data/oembed/options/bluesky", () => ({
	blueskyOembedByUri: {
		script: "https://embed.bsky.app/static/embed.js",
		createUrl: jest.fn(),
	},
}));

jest.mock("../../api/component-data/oembed/utils", () => ({
	fetchOembedList: jest.fn(),
}));

// Mock implementations
const mockGetFeed = getFeed as jest.MockedFunction<typeof getFeed>;
const mockGetAuthorFeed = getAuthorFeed as jest.MockedFunction<
	typeof getAuthorFeed
>;
const mockSearchPosts = searchPosts as jest.MockedFunction<typeof searchPosts>;
const mockGetPostThread = getPostThread as jest.MockedFunction<
	typeof getPostThread
>;
const mockFetchOembedList = fetchOembedList as jest.MockedFunction<
	typeof fetchOembedList
>;
const mockCreateUrl = blueskyOembedByUri.createUrl as jest.MockedFunction<
	typeof blueskyOembedByUri.createUrl
>;

describe("blueSkyFetch", () => {
	const mockOembedData: OEmbed[] = [
		{
			id: "mock-embed-1",
			title: "Mock BlueSky Post 1",
			type: "rich",
			version: "1.0",
			provider_name: "BlueSky",
			provider_url: "https://bsky.app",
			html: "<div>Mock embed 1</div>",
			width: 600,
			height: 400,
		},
		{
			id: "mock-embed-2",
			title: "Mock BlueSky Post 2",
			type: "rich",
			version: "1.0",
			provider_name: "BlueSky",
			provider_url: "https://bsky.app",
			html: "<div>Mock embed 2</div>",
			width: 600,
			height: 400,
		},
	];

	beforeEach(() => {
		jest.clearAllMocks();
		mockCreateUrl.mockReturnValue("https://embed.bsky.app/oembed?url=test");
		mockFetchOembedList.mockResolvedValue(mockOembedData);
	});

	describe("Feed variant", () => {
		it("should fetch feed and return oembed results with default variant", async () => {
			const mockItems = ["at://post1", "at://post2"];
			mockGetFeed.mockResolvedValue(mockItems);

			const result = await blueSkyFetch({
				feed: "at://did:plc:test/app.bsky.feed.generator/test",
			});

			expect(mockGetFeed).toHaveBeenCalledWith({
				feed: "at://did:plc:test/app.bsky.feed.generator/test",
			});
			expect(mockFetchOembedList).toHaveBeenCalledWith(
				mockItems,
				mockCreateUrl
			);
			expect(result).toEqual({
				items: mockOembedData,
				script: "https://embed.bsky.app/static/embed.js",
			});
		});

		it("should fetch feed with explicit Feed variant", async () => {
			const mockItems = ["at://post1", "at://post2"];
			mockGetFeed.mockResolvedValue(mockItems);

			const params = {
				variant: BlueskyVariant.Feed,
				feed: "at://did:plc:test/app.bsky.feed.generator/test",
				cursor: "cursor123",
				limit: 20,
			};

			await blueSkyFetch(params);

			expect(mockGetFeed).toHaveBeenCalledWith({
				feed: "at://did:plc:test/app.bsky.feed.generator/test",
				cursor: "cursor123",
				limit: 20,
			});
		});
	});

	describe("AuthorFeed variant", () => {
		it("should fetch author feed and return oembed results", async () => {
			const mockItems = ["at://authorpost1", "at://authorpost2"];
			mockGetAuthorFeed.mockResolvedValue(mockItems);

			const params = {
				variant: BlueskyVariant.AuthorFeed,
				actor: "did:plc:test123",
				cursor: "cursor456",
				limit: 15,
			};

			const result = await blueSkyFetch(params);

			expect(mockGetAuthorFeed).toHaveBeenCalledWith({
				actor: "did:plc:test123",
				cursor: "cursor456",
				limit: 15,
			});
			expect(mockFetchOembedList).toHaveBeenCalledWith(
				mockItems,
				mockCreateUrl
			);
			expect(result).toEqual({
				items: mockOembedData,
				script: "https://embed.bsky.app/static/embed.js",
			});
		});
	});

	describe("Thread variant", () => {
		it("should fetch post thread and return oembed results", async () => {
			const mockItems = ["at://threadpost1", "at://threadpost2"];
			mockGetPostThread.mockResolvedValue(mockItems);

			const params = {
				variant: BlueskyVariant.Thread,
				uri: "at://did:plc:test/app.bsky.feed.post/test",
				depth: 3,
				parentHeight: 5,
			};

			const result = await blueSkyFetch(params);

			expect(mockGetPostThread).toHaveBeenCalledWith({
				uri: "at://did:plc:test/app.bsky.feed.post/test",
				depth: 3,
				parentHeight: 5,
			});
			expect(mockFetchOembedList).toHaveBeenCalledWith(
				mockItems,
				mockCreateUrl
			);
			expect(result).toEqual({
				items: mockOembedData,
				script: "https://embed.bsky.app/static/embed.js",
			});
		});
	});

	describe("Search variant", () => {
		it("should search posts and return oembed results", async () => {
			const mockItems = ["at://searchpost1", "at://searchpost2"];
			mockSearchPosts.mockResolvedValue(mockItems);

			const params = {
				variant: BlueskyVariant.Search,
				q: "test query",
				sort: "top" as const,
				limit: 25,
			};

			const result = await blueSkyFetch(params);

			expect(mockSearchPosts).toHaveBeenCalledWith({
				q: "test query",
				sort: "top",
				limit: 25,
			});
			expect(mockFetchOembedList).toHaveBeenCalledWith(
				mockItems,
				mockCreateUrl
			);
			expect(result).toEqual({
				items: mockOembedData,
				script: "https://embed.bsky.app/static/embed.js",
			});
		});
	});

	describe("Default case", () => {
		it("should return empty items for unknown variant", async () => {
			const result = await blueSkyFetch({
				variant: "unknown" as any,
			});

			expect(mockGetFeed).not.toHaveBeenCalled();
			expect(mockGetAuthorFeed).not.toHaveBeenCalled();
			expect(mockSearchPosts).not.toHaveBeenCalled();
			expect(mockGetPostThread).not.toHaveBeenCalled();
			expect(mockFetchOembedList).toHaveBeenCalledWith([], mockCreateUrl);
			expect(result).toEqual({
				items: mockOembedData,
				script: "https://embed.bsky.app/static/embed.js",
			});
		});
	});

	describe("OEmbed filtering", () => {
		it("should filter out null results from oembed fetch", async () => {
			const mockItems = ["at://post1", "at://post2", "at://post3"];
			const mockOembedResults = [mockOembedData[0], null, mockOembedData[1]];

			mockGetFeed.mockResolvedValue(mockItems);
			mockFetchOembedList.mockResolvedValue(mockOembedResults);

			const result = await blueSkyFetch({
				feed: "at://did:plc:test/app.bsky.feed.generator/test",
			});

			expect(result.items).toEqual([mockOembedData[0], mockOembedData[1]]);
			expect(result.items).toHaveLength(2);
		});

		it("should handle empty oembed results", async () => {
			const mockItems = ["at://post1"];

			mockGetFeed.mockResolvedValue(mockItems);
			mockFetchOembedList.mockResolvedValue([]);

			const result = await blueSkyFetch({
				feed: "at://did:plc:test/app.bsky.feed.generator/test",
			});

			expect(result.items).toEqual([]);
			expect(result.script).toBe("https://embed.bsky.app/static/embed.js");
		});

		it("should handle all null oembed results", async () => {
			const mockItems = ["at://post1", "at://post2"];

			mockGetFeed.mockResolvedValue(mockItems);
			mockFetchOembedList.mockResolvedValue([null, null]);

			const result = await blueSkyFetch({
				feed: "at://did:plc:test/app.bsky.feed.generator/test",
			});

			expect(result.items).toEqual([]);
			expect(result.script).toBe("https://embed.bsky.app/static/embed.js");
		});
	});

	describe("Parameter passing", () => {
		it("should pass all relevant parameters to the appropriate function", async () => {
			const mockItems = ["at://post1"];
			mockGetFeed.mockResolvedValue(mockItems);

			const params = {
				variant: BlueskyVariant.Feed,
				feed: "test-feed",
				cursor: "test-cursor",
				limit: 50,
				// These should be filtered out for Feed variant
				actor: "should-be-ignored",
				uri: "should-be-ignored",
				depth: 99,
			};

			await blueSkyFetch(params);

			expect(mockGetFeed).toHaveBeenCalledWith({
				feed: "test-feed",
				cursor: "test-cursor",
				limit: 50,
				actor: "should-be-ignored",
				uri: "should-be-ignored",
				depth: 99,
			});
		});
	});
});
