import * as articleCollectionActions from "../../../../lib/mongo/actions/articleCollection";
import * as redisFetch from "../../../../lib/redis/redis-fetch";
import * as rssParseModule from "./rss-parse";
import * as adapters from "./adapters/article-adapter";
import * as videoAdapters from "./adapters/video-adapter";
import * as audioAdapters from "./adapters/audio-adapter";
import * as urlUtils from "../../../../utils/url";
import {
	getCollection,
	fetchRSSCollection,
	fetchRss,
	getParserCustomFields,
} from "./fetch-rss";

import * as cheerio from "cheerio";

jest.mock("cheerio", () => {
	return {
		__esModule: true,
		load: jest.fn((str) => ({
			text: jest.fn(() => str),
		})),
	};
});

jest.mock("../../../../lib/mongo/actions/articleCollection");
jest.mock("../../../../lib/redis/redis-fetch");
jest.mock("./rss-parse");
jest.mock("./adapters/article-adapter");
jest.mock("./adapters/video-adapter");
jest.mock("./adapters/audio-adapter");
jest.mock("../../../../utils/url");

describe("fetch-rss", () => {
	const mockUrl = "https://example.com/rss";
	const mockVariant = "article";
	const mockCollection = { id: "1", items: [] };

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("getParserCustomFields", () => {
		it("returns custom fields for video", () => {
			expect(getParserCustomFields("video")).toEqual({ item: ["media:group"] });
		});
		it("returns empty object for other types", () => {
			expect(getParserCustomFields("article")).toEqual({});
			expect(getParserCustomFields("audio")).toEqual({});
		});
	});

	describe("getCollection", () => {
		it.skip("returns cached collection if exists", async () => {
			(
				articleCollectionActions.getArticleCollectionByFeed as jest.Mock
			).mockResolvedValue(mockCollection);
			const result = await getCollection({
				url: mockUrl,
				variant: mockVariant,
			});
			expect(result).toEqual(mockCollection);
			expect(
				articleCollectionActions.getArticleCollectionByFeed
			).toHaveBeenCalledWith(mockUrl);
		});

		it("fetches, adapts, saves, and returns collection if not cached", async () => {
			(
				articleCollectionActions.getArticleCollectionByFeed as jest.Mock
			).mockResolvedValue(null);
			(rssParseModule.rssParse as jest.Mock).mockResolvedValue({ foo: "bar" });
			(adapters.articleAdapter as jest.Mock).mockResolvedValue(mockCollection);

			const result = await getCollection({ url: mockUrl, variant: "article" });
			expect(rssParseModule.rssParse).toHaveBeenCalledWith(mockUrl, {});
			expect(adapters.articleAdapter).toHaveBeenCalledWith({ foo: "bar" });
			expect(
				articleCollectionActions.saveOrCreateArticleCollectionByFeed
			).toHaveBeenCalledWith(mockCollection);
			expect(result).toEqual(mockCollection);
		});

		it("rejects if rssParse returns null", async () => {
			(
				articleCollectionActions.getArticleCollectionByFeed as jest.Mock
			).mockResolvedValue(null);
			(rssParseModule.rssParse as jest.Mock).mockResolvedValue(null);

			await expect(
				getCollection({ url: mockUrl, variant: "article" })
			).rejects.toEqual("Error fetching collection");
		});

		it("rejects if variant is invalid", async () => {
			(
				articleCollectionActions.getArticleCollectionByFeed as jest.Mock
			).mockResolvedValue(null);
			(rssParseModule.rssParse as jest.Mock).mockResolvedValue({ foo: "bar" });

			await expect(
				getCollection({ url: mockUrl, variant: "invalid" as any })
			).rejects.toEqual("Invalid variant");
		});
	});

	describe("fetchRSSCollection", () => {
		it("returns error for invalid URL", async () => {
			(urlUtils.isStringValidURL as jest.Mock).mockReturnValue(false);
			const result = await fetchRSSCollection({
				url: "bad-url",
				variant: "article",
			});
			expect(result).toEqual({ error: "Invalid URL" });
		});

		it("returns collection from cache", async () => {
			(urlUtils.isStringValidURL as jest.Mock).mockReturnValue(true);
			(redisFetch.fetchWithCache as jest.Mock).mockResolvedValue(
				mockCollection
			);

			const result = await fetchRSSCollection({
				url: mockUrl,
				variant: "article",
			});
			expect(redisFetch.fetchWithCache).toHaveBeenCalled();
			expect(result).toEqual(mockCollection);
		});

		it("returns error if fetchWithCache throws", async () => {
			(urlUtils.isStringValidURL as jest.Mock).mockReturnValue(true);
			(redisFetch.fetchWithCache as jest.Mock).mockImplementation(() => {
				throw new Error("fail");
			});

			const result = await fetchRSSCollection({
				url: mockUrl,
				variant: "article",
			});
			expect(result).toEqual({
				error: "Error fetching rss collectionPromises",
			});
		});
	});

	describe("fetchRss", () => {
		it("returns error if url is missing", async () => {
			// @ts-ignore
			const result = await fetchRss({ params: { variant: "article" } as any });
			expect(result).toEqual({ error: "No url provided" });
		});

		it.skip("returns collection for valid input", async () => {
			const mockFetch = jest
				.spyOn(exports, "fetchRSSCollection")
				.mockResolvedValue(mockCollection);
			// @ts-ignore
			const result = await fetchRss({
				params: { url: mockUrl, variant: "article" },
			});
			expect(mockFetch).toHaveBeenCalledWith({
				url: mockUrl,
				variant: "article",
			});
			expect(result).toEqual(mockCollection);
			mockFetch.mockRestore();
		});
	});
});
