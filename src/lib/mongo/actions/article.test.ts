import Article from "@/models/Article";
import { getArticleBySrc, saveOrCreateArticleBySrc } from "./article";
import { CollectionItem } from "../../../types/data-structures/collection/item/item";

jest.mock("../../../models/Article");

describe("article actions", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("getArticleBySrc", () => {
		it("should return an article when found", async () => {
			const mockArticle = { src: "test-src", title: "Test Article" };
			(Article.findOne as jest.Mock).mockReturnValue({
				lean: jest.fn().mockResolvedValue(mockArticle),
			});

			const result = await getArticleBySrc("test-src");
			expect(Article.findOne).toHaveBeenCalledWith({ src: "test-src" });
			expect(result).toEqual(mockArticle);
		});

		it("should return null when article is not found", async () => {
			(Article.findOne as jest.Mock).mockReturnValue({
				lean: jest.fn().mockResolvedValue(null),
			});

			const result = await getArticleBySrc("not-found-src");
			expect(result).toBeNull();
		});
	});

	describe("saveOrCreateArticleBySrc", () => {
		const mockArticle: CollectionItem = {
			src: "test-src",
			// add other required fields as needed for CollectionItem
		} as CollectionItem;

		it("should save or create and return the article", async () => {
			const mockRes = { src: "test-src", title: "Saved Article" };
			(Article.findOneAndUpdate as jest.Mock).mockReturnValue({
				lean: jest.fn().mockResolvedValue(mockRes),
			});

			const result = await saveOrCreateArticleBySrc(mockArticle);
			expect(Article.findOneAndUpdate).toHaveBeenCalledWith(
				{ src: mockArticle.src },
				mockArticle,
				{ new: true, upsert: true }
			);
			expect(result).toEqual({ result: mockRes, message: "Saved Article!" });
		});

		it("should return error message on exception", async () => {
			(Article.findOneAndUpdate as jest.Mock).mockImplementation(() => ({
				lean: jest.fn().mockRejectedValue(new Error("DB error")),
			}));

			const result = await saveOrCreateArticleBySrc(mockArticle);
			expect(result).toEqual({ message: "Error saving article" });
		});
	});
});
