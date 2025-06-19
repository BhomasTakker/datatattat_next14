import { getClientMeta } from "./get-meta";
import { fetchWithCache } from "@/lib/redis/redis-fetch";
import { getArticle } from "../data/article/get-article";
import { CollectionItem } from "@/types/data-structures/collection/item/item";

jest.mock("../../lib/redis/redis-fetch");
jest.mock("../data/article/get-article");

describe("getClientMeta", () => {
	const mockItem: CollectionItem = {
		src: "test-src",
		// add other required properties if needed
	} as CollectionItem;

	const mockArticle = { title: "Test Article", content: "Lorem ipsum" };

	beforeEach(() => {
		jest.clearAllMocks();
		(getArticle as jest.Mock).mockResolvedValue(mockArticle);
		(fetchWithCache as jest.Mock).mockImplementation(async (fn, key) => {
			return fn();
		});
	});

	it("calls fetchWithCache with getArticle and item.src", async () => {
		await getClientMeta(mockItem);
		expect(fetchWithCache).toHaveBeenCalledWith(
			expect.any(Function),
			mockItem.src
		);
	});

	it("calls getArticle with the item", async () => {
		await getClientMeta(mockItem);
		expect(getArticle).toHaveBeenCalledWith(mockItem);
	});

	it("returns the data from fetchWithCache", async () => {
		const result = await getClientMeta(mockItem);
		expect(result).toEqual(mockArticle);
	});

	it("propagates errors from fetchWithCache", async () => {
		(fetchWithCache as jest.Mock).mockRejectedValue(new Error("Cache error"));
		await expect(getClientMeta(mockItem)).rejects.toThrow("Cache error");
	});
});
