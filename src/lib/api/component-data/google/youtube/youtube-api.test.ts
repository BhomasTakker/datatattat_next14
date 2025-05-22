import {
	convertYouTubeItems,
	youtubeApiFetch,
	YouTubeSearchParams,
} from "./youtube-api";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { fetchWithCache } from "@/lib/redis/redis-fetch";

// Mock dependencies
jest.mock("../../../../../lib/redis/redis-fetch", () => ({
	fetchWithCache: jest.fn(),
}));

const OLD_ENV = process.env;

describe("convertYouTubeItems", () => {
	beforeEach(() => {
		jest.resetModules();
		process.env = { ...OLD_ENV };
		console.error = jest.fn();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should convert YouTubeItem array to CollectionItem array", () => {
		const items = [
			{
				id: { videoId: "abc123" },
				snippet: {
					title: "Test Video",
					description: "A test video",
					thumbnails: {
						high: { url: "http://img.com/1.jpg" },
					},
					channelTitle: "Test Channel",
					publishedAt: "2023-01-01T00:00:00Z",
				},
			},
		];
		const result = convertYouTubeItems(items as any);
		expect(result).toHaveLength(1);
		expect(result[0]).toMatchObject({
			src: "https://www.youtube.com/watch?v=abc123",
			avatar: { src: "http://img.com/1.jpg", alt: "Test Video" },
			title: "Test Video",
			description: "A test video",
			guid: "abc123",
			variant: "video",
			details: {
				publishers: ["Test Channel"],
				published: "2023-01-01T00:00:00Z",
			},
		});
	});

	it("should handle empty input", () => {
		expect(convertYouTubeItems([])).toEqual([]);
	});
});

describe("youtubeApiFetch", () => {
	const OLD_ENV = process.env;

	beforeEach(() => {
		jest.resetModules();
		process.env = { ...OLD_ENV, YOUTUBE_API_KEY: "FAKE_KEY" };
	});

	afterAll(() => {
		process.env = OLD_ENV;
	});

	it("should throw error if API key is missing", async () => {
		process.env.YOUTUBE_API_KEY = "";
		await expect(youtubeApiFetch({ q: "test" })).rejects.toThrow(
			"No API Key found"
		);
	});

	it("should call fetchWithCache with correct params and return items", async () => {
		process.env.YOUTUBE_API_KEY = "youtube-mock-api-key";
		const mockItems: CollectionItem[] = [
			{
				src: "url",
				avatar: { src: "", alt: "" },
				collectionType: "",
				title: "",
				description: "",
				guid: "",
				provider: undefined,
				variant: "video",
				details: {
					docs: [],
					categories: [],
					authors: [],
					publishers: [""],
					published: "",
				},
			},
		];
		(fetchWithCache as jest.Mock).mockResolvedValueOnce(mockItems);

		const params: YouTubeSearchParams = { q: "music", maxResults: 2 };
		const result = await youtubeApiFetch(params);

		expect(fetchWithCache).toHaveBeenCalled();
		expect(result).toHaveProperty("items", mockItems);
	});

	it("should handle fetchWithCache errors gracefully", async () => {
		(fetchWithCache as jest.Mock).mockRejectedValueOnce(new Error("fail"));
		const params: YouTubeSearchParams = { q: "fail" };
		const result = await youtubeApiFetch(params);
		expect(result).toEqual({});
	});
});
