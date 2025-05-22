import {
	adaptItem,
	audioAdapter,
	convertDurationToSeconds,
	PodcastRSSItem,
	PodcastRSSCollection,
} from "./audio-adapter";
import * as articleActions from "../../../../../lib/mongo/actions/article";
import * as saveArticleActions from "../../../../../actions/data/article/save-article";
import { cloneDeep } from "../../../../../utils/object";

// Mock dependencies
jest.mock("../../../../../lib/mongo/actions/article");
jest.mock("../../../../../actions/data/article/save-article");
jest.mock("../../../../../utils/object", () => ({
	cloneDeep: jest.fn((obj) => obj),
}));

const mockPodcastItem: PodcastRSSItem = {
	title: "Test Episode",
	description: "Test Description",
	link: "http://example.com/episode",
	pubDate: "2024-06-01",
	guid: "guid-123",
	enclosure: {
		url: "http://example.com/audio.mp3",
		type: "audio/mpeg",
	},
	itunes: {
		duration: "01:02:03",
		episodeType: "full",
		author: "Test Author",
		subtitle: "Test Subtitle",
		summary: "Test Summary",
		block: "no",
		explicit: "no",
	},
	content: {
		encoded: "<p>Test Content</p>",
	},
};

const mockPodcastCollection: PodcastRSSCollection = {
	feedUrl: "http://example.com/feed",
	items: [mockPodcastItem],
	link: "http://example.com",
	title: "Test Podcast",
	description: "Podcast Description",
	lastBuildDate: "2024-06-01",
	language: "en",
	copyright: "Copyright",
	generator: "Generator",
	author: "Podcast Author",
	image: {
		url: "http://example.com/image.jpg",
		title: "Image Title",
		link: "http://example.com",
	},
	itunes: {
		owner: {
			name: "Owner Name",
			email: "owner@example.com",
		},
		image: "http://example.com/image.jpg",
		categories: ["Tech", "News"],
		explicit: "no",
		author: "Podcast Author",
		summary: "Podcast Summary",
	},
};

describe("convertDurationToSeconds", () => {
	it("should convert HH:MM:SS to seconds", () => {
		expect(convertDurationToSeconds("01:02:03")).toBe(3723);
	});

	it("should convert MM:SS to seconds", () => {
		expect(convertDurationToSeconds("02:03")).toBe(123);
	});

	it("should convert SS to seconds", () => {
		expect(convertDurationToSeconds("45")).toBe(45);
	});

	it("should return undefined for empty input", () => {
		expect(convertDurationToSeconds("")).toBeUndefined();
	});

	it("should handle numeric string as seconds", () => {
		expect(convertDurationToSeconds("120")).toBe(120);
	});
});

describe("adaptItem", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should return item if enclosure url is missing", async () => {
		const item = { ...mockPodcastItem, enclosure: undefined as any };
		const result = await adaptItem(item, mockPodcastCollection);
		expect(result).toBe(item);
	});

	it("should return existing article if found", async () => {
		(articleActions.getArticleBySrc as jest.Mock).mockResolvedValue({
			id: "existing",
		});
		const result = await adaptItem(mockPodcastItem, mockPodcastCollection);
		expect(result).toEqual({ id: "existing" });
	});

	it("should create and save new article if not found", async () => {
		(articleActions.getArticleBySrc as jest.Mock).mockResolvedValue(undefined);
		(saveArticleActions.saveOrUpdateArticle as jest.Mock).mockResolvedValue(
			undefined
		);

		const result = await adaptItem(mockPodcastItem, mockPodcastCollection);

		expect(result).toHaveProperty("title", mockPodcastItem.title);
		expect(result).toHaveProperty("src", mockPodcastItem.enclosure.url);
		expect(saveArticleActions.saveOrUpdateArticle).toHaveBeenCalledWith(
			expect.objectContaining({
				title: mockPodcastItem.title,
				src: mockPodcastItem.enclosure.url,
			})
		);
	});
});

describe("audioAdapter", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(articleActions.getArticleBySrc as jest.Mock).mockResolvedValue(undefined);
		(saveArticleActions.saveOrUpdateArticle as jest.Mock).mockResolvedValue(
			undefined
		);
		(cloneDeep as jest.Mock).mockImplementation((obj) => obj);
	});

	it("should process all items and return adapted collection", async () => {
		const result = await audioAdapter(mockPodcastCollection);
		expect(result).toHaveProperty("items");
		expect(Array.isArray(result.items)).toBe(true);
		expect(result.items[0]).toHaveProperty("title", mockPodcastItem.title);
		expect(cloneDeep).toHaveBeenCalled();
	});

	it("should handle empty items array", async () => {
		const collection = { ...mockPodcastCollection, items: [] };
		const result = await audioAdapter(collection);
		expect(result.items).toEqual([]);
	});
});
