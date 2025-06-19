import { metaFetch } from "./meta-fetch";
import { fetchWithCache } from "@/lib/redis/redis-fetch";
import { getArticle } from "@/actions/data/article/get-article";
import { isStringValidURL } from "@/utils/url";
import { Collection } from "@/types/data-structures/collection/collection";

jest.mock("../../../../lib/redis/redis-fetch");
jest.mock("../../../../actions/data/article/get-article");
jest.mock("../../../../utils/url");

const mockedFetchWithCache = fetchWithCache as jest.Mock;
const mockedGetArticle = getArticle as jest.Mock;
const mockedIsStringValidURL = isStringValidURL as jest.Mock;

describe("metaFetch", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("returns error if no urls are provided", async () => {
		const result = await metaFetch({ params: {} } as any);
		expect(result).toEqual({ error: "No urls provided" });
	});

	it("filters out invalid URLs", async () => {
		mockedIsStringValidURL.mockImplementation((url: string) =>
			url.startsWith("http")
		);
		mockedFetchWithCache.mockImplementation((fn: any, url: string) =>
			Promise.resolve({ url })
		);

		const query = { params: { urls: ["http://valid.com", "invalid"] } };
		const result = (await metaFetch(query as any)) as Collection;

		expect(mockedIsStringValidURL).toHaveBeenCalledTimes(2);
		expect(mockedFetchWithCache).toHaveBeenCalledTimes(1);
		expect(result.items).toEqual([{ url: "http://valid.com" }]);
	});

	it("returns only non-falsy items", async () => {
		mockedIsStringValidURL.mockReturnValue(true);
		mockedFetchWithCache
			.mockResolvedValueOnce({ url: "http://a.com" })
			.mockResolvedValueOnce(null);

		const query = { params: { urls: ["http://a.com", "http://b.com"] } };
		const result = (await metaFetch(query as any)) as Collection;

		expect(result.items).toEqual([{ url: "http://a.com" }]);
	});

	it("calls fetchWithCache with getArticle and url", async () => {
		mockedIsStringValidURL.mockReturnValue(true);
		mockedFetchWithCache.mockResolvedValue({ url: "http://a.com" });

		const query = { params: { urls: ["http://a.com"] } };
		await metaFetch(query as any);

		expect(mockedFetchWithCache).toHaveBeenCalledWith(
			expect.any(Function),
			"http://a.com"
		);
	});

	it("handles empty urls array", async () => {
		const query = { params: { urls: [] } };
		const result = (await metaFetch(query as any)) as Collection;
		expect(result.items).toEqual([]);
	});
});
