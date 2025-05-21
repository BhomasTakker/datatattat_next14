import { searchArticles, GetLatestArticlesProps } from "./search";
import { fetchWithCache } from "../../../../lib/redis/redis-fetch";
import { buildArticleSearchQuery } from "./query";
import { CollectionItem } from "../../../../types/data-structures/collection/item/item";

// Mock dependencies
jest.mock("../../../../lib/redis/redis-fetch");
jest.mock("./query");

const mockArticles: CollectionItem[] = [
	{ id: "1", title: "Test Article 1" } as unknown as CollectionItem,
	{ id: "2", title: "Test Article 2" } as unknown as CollectionItem,
];

describe("searchArticles", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should call fetchWithCache with correct parameters", async () => {
		(fetchWithCache as jest.Mock).mockImplementation(async (fn) => fn());
		(buildArticleSearchQuery as jest.Mock).mockResolvedValue(mockArticles);

		const params: GetLatestArticlesProps = { mustContain: ["test"] };
		const result = await searchArticles(params);

		expect(fetchWithCache).toHaveBeenCalledWith(
			expect.any(Function),
			JSON.stringify(params),
			60 * 60,
			true
		);
		expect(result.items).toEqual(mockArticles);
	});

	it("should return empty items if buildArticleSearchQuery returns empty array", async () => {
		(fetchWithCache as jest.Mock).mockImplementation(async (fn) => fn());
		(buildArticleSearchQuery as jest.Mock).mockResolvedValue([]);

		const params: GetLatestArticlesProps = {};
		const result = await searchArticles(params);

		expect(result.items).toEqual([]);
	});

	it("should pass all params to buildArticleSearchQuery", async () => {
		(fetchWithCache as jest.Mock).mockImplementation(async (fn) => fn());
		(buildArticleSearchQuery as jest.Mock).mockResolvedValue(mockArticles);

		const params: GetLatestArticlesProps = {
			mustContain: ["foo"],
			mustNotContain: ["bar"],
			shouldContain: ["baz"],
			filterContain: ["qux"],
			minimumShouldMatch: 1,
			textScore: "score",
			contentType: "news",
			provider: "provider",
			origin: "origin",
			variant: "variant",
			before: new Date(),
			after: new Date(),
			within: "1d",
			trustHigher: "0.8",
			trustLower: "0.2",
			leaningHigher: "0.7",
			leaningLower: "0.3",
			durationHigher: "10",
			durationLower: "1",
			region: "US",
			language: "en",
			sort: "desc",
			limit: "10",
		};

		await searchArticles(params);

		expect(buildArticleSearchQuery).toHaveBeenCalledWith(params);
	});

	it("should cache results for the specified time", async () => {
		(fetchWithCache as jest.Mock).mockImplementation(async (fn) => fn());
		(buildArticleSearchQuery as jest.Mock).mockResolvedValue(mockArticles);

		const params: GetLatestArticlesProps = { mustContain: ["cache"] };
		await searchArticles(params);

		expect(fetchWithCache).toHaveBeenCalledWith(
			expect.any(Function),
			JSON.stringify(params),
			60 * 60,
			true
		);
	});
});
