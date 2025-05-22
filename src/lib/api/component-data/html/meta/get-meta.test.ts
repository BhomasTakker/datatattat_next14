import { fetchMeta } from "./get-meta";
import { getArticle } from "@/actions/data/article/get-article";
import { saveOrUpdateArticle } from "@/actions/data/article/save-article";
import { fetchWithCache } from "@/lib/redis/redis-fetch";

jest.mock("../../../../../actions/data/article/get-article");
jest.mock("../../../../../actions/data/article/save-article");
jest.mock("../../../../../lib/redis/redis-fetch");

const mockSaveOrUpdateArticle = saveOrUpdateArticle as jest.Mock;
const mockFetchWithCache = fetchWithCache as jest.Mock;

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

describe("fetchMeta", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("returns empty array if items is undefined", async () => {
		const result = await fetchMeta(undefined as any, 2);
		expect(result).toEqual([]);
	});

	it("returns empty array if items is null", async () => {
		const result = await fetchMeta(null as any, 2);
		expect(result).toEqual([]);
	});

	it("returns empty array if items is not an array", async () => {
		const result = await fetchMeta({} as any, 2);
		expect(result).toEqual([]);
	});

	it("calls saveOrUpdateArticle for items without meta", async () => {
		const items = [
			{ id: "1", src: "src1" },
			{ id: "2", src: "src2", meta: false },
		];
		const result = await fetchMeta(items as any, 2);
		expect(mockSaveOrUpdateArticle).toHaveBeenCalledTimes(2);
		expect(result[0].meta).toBeUndefined();
		expect(result[1].meta).toBeUndefined();
	});

	it("calls fetchWithCache for items with meta and index <= limit", async () => {
		const items = [
			{ id: "1", src: "src1", meta: true },
			{ id: "2", src: "src2", meta: true },
		];
		mockFetchWithCache.mockImplementation((fn, src) =>
			Promise.resolve({ id: "fetched", src })
		);
		const result = await fetchMeta(items as any, 2);
		expect(mockFetchWithCache).toHaveBeenCalledTimes(2);
		expect(result[0]).toEqual({ id: "fetched", src: "src1" });
		expect(result[1]).toEqual({ id: "fetched", src: "src2" });
	});

	it("returns item with loadData: true if index > limit", async () => {
		const items = [
			{ id: "1", src: "src1", meta: true },
			{ id: "2", src: "src2", meta: true },
			{ id: "3", src: "src3", meta: true },
		];
		const limit = 1;
		mockFetchWithCache.mockImplementation((fn, src) =>
			Promise.resolve({ id: "fetched", src })
		);
		const result = await fetchMeta(items as any, limit);
		expect(mockFetchWithCache).toHaveBeenCalledTimes(2);
		expect(result[2]).toEqual({
			id: "3",
			src: "src3",
			meta: true,
			loadData: true,
		});
	});

	it("handles mixed meta and non-meta items", async () => {
		const items = [
			{ id: "1", src: "src1" },
			{ id: "2", src: "src2", meta: true },
			{ id: "3", src: "src3", meta: false },
		];
		mockFetchWithCache.mockImplementation((fn, src) =>
			Promise.resolve({ id: "fetched", src })
		);
		const result = await fetchMeta(items as any, 2);
		expect(mockSaveOrUpdateArticle).toHaveBeenCalledTimes(2);
		expect(mockFetchWithCache).toHaveBeenCalledTimes(1);
		expect(result[1]).toEqual({ id: "fetched", src: "src2" });
	});
});
