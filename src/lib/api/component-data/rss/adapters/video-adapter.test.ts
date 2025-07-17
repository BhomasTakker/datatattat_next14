import { adaptItem, videoAdapter } from "./video-adapter";
import { getArticleBySrc } from "../../../../../lib/mongo/actions/article";
import { saveOrUpdateArticle } from "../../../../../actions/data/article/save-article";
import { cloneDeep } from "../../../../../utils/object";
import { filterLimit } from "../utils/limit";
import { YouTubeRSSItem } from "../types";
import { RSSChannelType } from "../../../../../types/data-structures/rss";

jest.mock("../../../../../lib/mongo/actions/article");
jest.mock("../../../../../actions/data/article/save-article");
jest.mock("../../../../../utils/object", () => ({
	cloneDeep: jest.fn((obj) => obj),
}));
jest.mock("../utils/limit", () => ({
	filterLimit: jest.fn((items) => items),
}));

const mockYouTubeRSSItem: YouTubeRSSItem = {
	title: "Test Video",
	description: "Test Description",
	link: "https://youtube.com/watch?v=test",
	pubDate: "2024-06-01",
	author: "Test Author",
	id: "test-id",
	isoDate: "2024-06-01T00:00:00Z",
	"media:group": {
		"media:title": ["Test Video"],
		"media:thumbnail": [
			{ $: { url: "https://img.youtube.com/vi/test/hqdefault.jpg" } },
		],
		"media:description": ["Test Description"],
		"media:community": [
			{
				"media:starRating": [{ $: { average: "4.5" } }],
				"media:statistics": [{ $: { views: "1000" } }],
			},
		],
	},
};

describe("adaptItem", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("returns item if link is missing", async () => {
		const item = { ...mockYouTubeRSSItem, link: undefined };
		const result = await adaptItem(item as any);
		expect(result).toBe(item);
	});

	it("returns existing article if found", async () => {
		(getArticleBySrc as jest.Mock).mockResolvedValueOnce({ existing: true });
		const result = await adaptItem(mockYouTubeRSSItem);
		expect(getArticleBySrc).toHaveBeenCalledWith(mockYouTubeRSSItem.link);
		expect(result).toEqual({ existing: true });
	});

	it("creates and saves new article if not found", async () => {
		(getArticleBySrc as jest.Mock).mockResolvedValueOnce(null);
		(saveOrUpdateArticle as jest.Mock).mockResolvedValueOnce(undefined);

		const result = await adaptItem(mockYouTubeRSSItem);

		expect(getArticleBySrc).toHaveBeenCalledWith(mockYouTubeRSSItem.link);
		expect(saveOrUpdateArticle).toHaveBeenCalledWith(
			expect.objectContaining({
				title: mockYouTubeRSSItem.title,
				src: mockYouTubeRSSItem.link,
				description: mockYouTubeRSSItem.description,
				guid: mockYouTubeRSSItem.id,
				variant: "video/youtube",
				avatar: {
					src: "https://img.youtube.com/vi/test/hqdefault.jpg",
					alt: "Test Video",
				},
				details: {
					published: mockYouTubeRSSItem.pubDate,
					publishers: [mockYouTubeRSSItem.author],
				},
				media: {
					format: "youtube",
					rating: "4.5",
					views: "1000",
				},
			})
		);
		expect(result).toHaveProperty("title", mockYouTubeRSSItem.title);
		expect(result).toHaveProperty("variant", "video");
	});
});

describe("videoAdapter", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("adapts all items and returns collection", async () => {
		const article: RSSChannelType = {
			link: "https://youtube.com/feed",
			feedUrl: "https://youtube.com/feed.xml",
			title: "YouTube Feed",
			items: [mockYouTubeRSSItem, mockYouTubeRSSItem],
			description: "",
		};

		(filterLimit as jest.Mock).mockImplementation((items) => items);
		(getArticleBySrc as jest.Mock).mockResolvedValue(null);
		(saveOrUpdateArticle as jest.Mock).mockResolvedValue(undefined);

		const result = await videoAdapter(article);

		expect(filterLimit).toHaveBeenCalledWith(article.items);
		expect(result).toHaveProperty("link", article.link);
		expect(result).toHaveProperty("feedUrl", article.feedUrl);
		expect(result).toHaveProperty("title", article.title);
		expect(result.items).toHaveLength(2);
		expect(cloneDeep).toHaveBeenCalled();
	});

	it("handles empty items array", async () => {
		const article: RSSChannelType = {
			link: "https://youtube.com/feed",
			feedUrl: "https://youtube.com/feed.xml",
			title: "YouTube Feed",
			items: [],
			description: "",
		};

		const result = await videoAdapter(article);

		expect(result.items).toEqual([]);
	});
});
