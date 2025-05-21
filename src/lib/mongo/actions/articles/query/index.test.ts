import { buildArticleSearchQuery } from "./index";
import Article from "../../../../../models/Article";
import { createSearchAggregate } from "./searchAggregate";
import { GetLatestArticlesProps } from "../search";

// Mock dependencies
jest.mock("../../../../../models/Article", () => ({
	aggregate: jest.fn(),
}));
jest.mock("./searchAggregate", () => ({
	createSearchAggregate: jest.fn(),
}));

describe("buildArticleSearchQuery", () => {
	const mockQueryParams: GetLatestArticlesProps = { search: "test" } as any;
	const mockAggregate = [{ $match: { title: /test/i } }];
	const mockResult = [{ _id: "1", title: "Test Article" }];

	beforeEach(() => {
		(createSearchAggregate as jest.Mock).mockReturnValue(mockAggregate);
		(Article.aggregate as jest.Mock).mockResolvedValue(mockResult);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should call createSearchAggregate with queryParams and empty aggregator", async () => {
		await buildArticleSearchQuery(mockQueryParams);
		expect(createSearchAggregate).toHaveBeenCalledWith(mockQueryParams, []);
	});

	it("should call Article.aggregate with the aggregation pipeline", async () => {
		await buildArticleSearchQuery(mockQueryParams);
		expect(Article.aggregate).toHaveBeenCalledWith(mockAggregate);
	});

	it("should return the result from Article.aggregate", async () => {
		const result = await buildArticleSearchQuery(mockQueryParams);
		expect(result).toBe(mockResult);
	});

	it("should handle empty results", async () => {
		(Article.aggregate as jest.Mock).mockResolvedValue([]);
		const result = await buildArticleSearchQuery(mockQueryParams);
		expect(result).toEqual([]);
	});
});
