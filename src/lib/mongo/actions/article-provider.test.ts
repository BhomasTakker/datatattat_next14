import {
	getArticleProviderByName,
	getArticleProviderByDomain,
	saveOrCreateArticleProviderByName,
} from "./article-provider";
import ArticleProvider from "@/models/ArticleProvider";
import { ProviderItem } from "@/types/data-structures/collection/item/item";

jest.mock("../../../models/ArticleProvider");

describe("article-provider actions", () => {
	const mockProvider = {
		name: "TestProvider",
		url: "https://test.com",
		otherField: "value",
	} as unknown as ProviderItem;

	beforeEach(() => {
		console.error = jest.fn();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("getArticleProviderByName", () => {
		it("should return provider when found", async () => {
			(ArticleProvider.findOne as jest.Mock).mockReturnValueOnce({
				lean: jest.fn().mockResolvedValueOnce(mockProvider),
			});

			const result = await getArticleProviderByName("TestProvider");
			expect(ArticleProvider.findOne).toHaveBeenCalledWith({
				name: "TestProvider",
			});
			expect(result).toEqual(mockProvider);
		});

		it("should return null when provider not found", async () => {
			(ArticleProvider.findOne as jest.Mock).mockReturnValueOnce({
				lean: jest.fn().mockResolvedValueOnce(null),
			});

			const result = await getArticleProviderByName("UnknownProvider");
			expect(result).toBeNull();
		});
	});

	describe("getArticleProviderByDomain", () => {
		it("should return provider when found by domain", async () => {
			(ArticleProvider.findOne as jest.Mock).mockReturnValueOnce({
				lean: jest.fn().mockResolvedValueOnce(mockProvider),
			});

			const result = await getArticleProviderByDomain("https://test.com");
			expect(ArticleProvider.findOne).toHaveBeenCalledWith({
				url: "https://test.com",
			});
			expect(result).toEqual(mockProvider);
		});

		it("should return null when provider not found by domain", async () => {
			(ArticleProvider.findOne as jest.Mock).mockReturnValueOnce({
				lean: jest.fn().mockResolvedValueOnce(null),
			});

			const result = await getArticleProviderByDomain("https://unknown.com");
			expect(result).toBeNull();
		});
	});

	describe("saveOrCreateArticleProviderByName", () => {
		it("should upsert provider and not throw", async () => {
			(ArticleProvider.findOneAndUpdate as jest.Mock).mockResolvedValueOnce(
				mockProvider
			);

			const result = await saveOrCreateArticleProviderByName(mockProvider);
			expect(ArticleProvider.findOneAndUpdate).toHaveBeenCalledWith(
				{ name: mockProvider.name },
				mockProvider,
				{ new: true, upsert: true }
			);
			expect(result).toBeUndefined();
		});

		it("should handle errors and return error message", async () => {
			(ArticleProvider.findOneAndUpdate as jest.Mock).mockRejectedValueOnce(
				new Error("DB error")
			);

			const result = await saveOrCreateArticleProviderByName(mockProvider);
			expect(result).toEqual({ message: "Error saving article provider" });
		});
	});
});
