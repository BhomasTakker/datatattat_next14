import * as articleAdapterFunctions from "./article-adapter";
import { getMeta } from "../../../../../actions/html/get-meta";
import { getArticleBySrc } from "../../../../../lib/mongo/actions/article";
import { saveOrUpdateArticle } from "../../../../../actions/data/article/save-article";
import { filterLimit } from "../utils/limit";
import { cloneDeep } from "../../../../../utils/object";
import {
	RSSChannelType,
	RSSItem,
} from "../../../../../types/data-structures/rss";
import { CollectionItem } from "@/types/data-structures/collection/item/item";

// This is just a fix
// We need to mock Cheerio else it will fail having been 'loaded' in the code
jest.mock("cheerio", () => {
	return {
		__esModule: true,
		load: jest.fn((str) => ({
			text: jest.fn(() => str),
		})),
	};
});

jest.mock("./article-adapter", () => {
	return {
		__esModule: true, //    <----- this __esModule: true is important
		...jest.requireActual("./article-adapter"),
	};
});
const adaptItemSpy = jest.spyOn(articleAdapterFunctions, "adaptItem");
const articleAdapterSpy = jest.spyOn(articleAdapterFunctions, "articleAdapter");

const { adaptItem, articleAdapter } = articleAdapterFunctions;
// Mock dependencies
jest.mock("../../../../../actions/html/get-meta");
jest.mock("../../../../../lib/mongo/actions/article");
jest.mock("../../../../../actions/data/article/save-article");
jest.mock("../utils/limit");
jest.mock("../../../../../utils/object", () => ({
	cloneDeep: jest.fn((x) => x),
}));

const mockGetMeta = getMeta as jest.Mock;
const mockGetArticleBySrc = getArticleBySrc as jest.Mock;
const mockSaveOrUpdateArticle = saveOrUpdateArticle as jest.Mock;
const mockFilterLimit = filterLimit as jest.Mock;

describe("adaptItem", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("returns the item if link is missing", async () => {
		const item: RSSItem = { title: "No link", description: "desc" } as any;
		const result = await adaptItem(item);
		expect(result).toBe(item);
		expect(mockGetArticleBySrc).not.toHaveBeenCalled();
	});

	it("returns existing article if found in DB", async () => {
		const item: RSSItem = { link: "http://test.com", title: "Test" } as any;
		const existing = { src: "http://test.com", title: "Existing" };
		mockGetArticleBySrc.mockResolvedValue(existing);

		const result = await adaptItem(item);
		expect(mockGetArticleBySrc).toHaveBeenCalledWith("http://test.com");
		expect(result).toBe(existing);
		expect(mockGetMeta).not.toHaveBeenCalled();
	});

	it("fetches meta and saves new article if not found", async () => {
		const item: RSSItem = {
			link: "http://test.com",
			title: "Test",
			description: "desc",
			pubDate: "2024-01-01",
			guid: "guid1",
		} as any;
		mockGetArticleBySrc.mockResolvedValue(null);
		mockGetMeta.mockResolvedValue({
			image: "img.jpg",
			title: "Meta Title",
			description: "Meta Desc",
		});

		const result = await adaptItem(item);

		expect(mockGetMeta).toHaveBeenCalledWith("http://test.com");
		expect(mockSaveOrUpdateArticle).toHaveBeenCalledWith(
			expect.objectContaining({
				src: "http://test.com",
				title: "Test",
				description: "desc",
				avatar: { src: "img.jpg", alt: "Meta Title" },
				guid: "guid1",
				variant: "article",
				details: { published: "2024-01-01" },
			})
		);
		expect(result).toEqual(
			expect.objectContaining({
				src: "http://test.com",
				title: "Test",
				description: "desc",
				avatar: { src: "img.jpg", alt: "Meta Title" },
				guid: "guid1",
				variant: "article",
				details: { published: "2024-01-01" },
			})
		);
	});

	it("uses meta title/description if item title/description missing", async () => {
		const item: RSSItem = {
			link: "http://test.com",
			pubDate: "2024-01-01",
			guid: "guid1",
		} as any;
		mockGetArticleBySrc.mockResolvedValue(null);
		mockGetMeta.mockResolvedValue({
			image: "img.jpg",
			title: "Meta Title",
			description: "Meta Desc",
		});

		const result = (await adaptItem(item)) as CollectionItem;

		expect(result.title).toBe("Meta Title");
		expect(result.description).toBe("Meta Desc");
	});

	it("handles missing meta gracefully", async () => {
		const item: RSSItem = {
			link: "http://test.com",
			title: "Test",
			description: "desc",
			pubDate: "2024-01-01",
			guid: "guid1",
		} as any;
		mockGetArticleBySrc.mockResolvedValue(null);
		mockGetMeta.mockResolvedValue(null);

		const result = (await adaptItem(item)) as CollectionItem;

		expect(result.avatar).toEqual({ src: "", alt: "" });
		expect(result.title).toBe("Test");
		expect(result.description).toBe("desc");
	});
});

describe("articleAdapter", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("adapts all filtered items and returns a collection", async () => {
		const items: RSSItem[] = [
			{ link: "http://a.com", title: "A" } as any,
			{ link: "http://b.com", title: "B" } as any,
		];
		mockFilterLimit.mockReturnValue(items);
		// Tried to mock adaptItem but the mock wasn't calld come back to
		const adapted = [
			{
				src: "http://a.com",
				title: "A",
				avatar: {
					alt: "",
					src: "",
				},
				description: "",
				details: {
					published: undefined,
				},
				guid: "",
				variant: "article",
			},
			{
				src: "http://b.com",
				title: "B",
				avatar: {
					alt: "",
					src: "",
				},
				description: "",
				details: {
					published: undefined,
				},
				guid: "",
				variant: "article",
			},
		];

		const input: RSSChannelType = {
			title: "Feed",
			link: "http://feed.com",
			description: "desc",
			items,
			image: { url: "img.jpg", title: "img", link: "http://img.com" },
			feedUrl: "http://feed.com/rss",
		};

		const result = await articleAdapter(input);

		expect(mockFilterLimit).toHaveBeenCalledWith(items);
		expect(result).toEqual({
			...input,
			items: adapted,
		});
		expect(cloneDeep).toHaveBeenCalledTimes(1);
	});

	it("handles empty items array", async () => {
		mockFilterLimit.mockReturnValue([]);
		const input: RSSChannelType = {
			title: "Feed",
			link: "http://feed.com",
			description: "desc",
			items: [],
			image: { url: "img.jpg", title: "img", link: "http://img.com" },
			feedUrl: "http://feed.com/rss",
		};

		const result = await articleAdapter(input);

		expect(result.items).toEqual([]);
	});
});
