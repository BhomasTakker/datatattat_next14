import {
	getArticleCollectionByFeed,
	saveOrCreateArticleCollectionByFeed,
	saveOrCreateArticleCollectionByFeed2,
} from "./articleCollection";
import ArticleCollection from "../../../models/ArticleCollection";

jest.mock("../../../models/ArticleCollection");

describe("articleCollection actions", () => {
	const mockDate = new Date("2025-11-01T12:00:00.000Z");

	beforeEach(() => {
		jest.useFakeTimers();
		jest.setSystemTime(mockDate);
	});

	afterEach(() => {
		jest.clearAllMocks();
		jest.useRealTimers();
	});

	describe("getArticleCollectionByFeed", () => {
		it("should return the article collection for a given feed", async () => {
			const mockCollection = { feed: "test-feed", articles: [] };
			(ArticleCollection.findOne as jest.Mock).mockReturnValue({
				lean: jest.fn().mockResolvedValue(mockCollection),
			});

			const result = await getArticleCollectionByFeed("test-feed");
			expect(ArticleCollection.findOne).toHaveBeenCalledWith({
				feed: "test-feed",
			});
			expect(result).toEqual(mockCollection);
		});
	});

	describe("saveOrCreateArticleCollectionByFeed", () => {
		it("should upsert and return the article collection", async () => {
			const collection = { feedUrl: "feed-url", title: "Test Feed" };
			const mockRes = { feed: "feed-url", title: "Test Feed" };
			(ArticleCollection.findOneAndUpdate as jest.Mock).mockReturnValue({
				lean: jest.fn().mockResolvedValue(mockRes),
			});

			const result = await saveOrCreateArticleCollectionByFeed(
				collection as any
			);
			expect(ArticleCollection.findOneAndUpdate).toHaveBeenCalledWith(
				{ feed: "feed-url" },
				{ ...collection },
				{ new: true, upsert: true }
			);
			expect(result).toEqual({
				result: mockRes,
				message: "Saved Article Collection!",
			});
		});

		it("should return error message on failure", async () => {
			(ArticleCollection.findOneAndUpdate as jest.Mock).mockImplementation(
				() => ({
					lean: jest.fn().mockRejectedValue(new Error("fail")),
				})
			);

			const result = await saveOrCreateArticleCollectionByFeed({
				feedUrl: "fail",
			} as any);
			expect(result).toEqual({ message: "Error saving article collection" });
		});
	});

	describe("saveOrCreateArticleCollectionByFeed2", () => {
		it("should upsert and return the article collection", async () => {
			const collection = { feed: "feed-2", articles: [] };
			const mockRes = { feed: "feed-2", articles: [] };
			(ArticleCollection.findOneAndUpdate as jest.Mock).mockReturnValue({
				lean: jest.fn().mockResolvedValue(mockRes),
			});

			const result = await saveOrCreateArticleCollectionByFeed2(
				collection as any
			);
			expect(ArticleCollection.findOneAndUpdate).toHaveBeenCalledWith(
				{ feed: "feed-2" },
				{ ...collection },
				{ new: true, upsert: true }
			);
			expect(result).toEqual({
				result: mockRes,
				message: "Saved Article Collection!",
			});
		});

		it("should return error message on failure", async () => {
			(ArticleCollection.findOneAndUpdate as jest.Mock).mockImplementation(
				() => ({
					lean: jest.fn().mockRejectedValue(new Error("fail")),
				})
			);

			const result = await saveOrCreateArticleCollectionByFeed2({
				feed: "fail",
			} as any);
			expect(result).toEqual({ message: "Error saving article collection." });
		});
	});
});
