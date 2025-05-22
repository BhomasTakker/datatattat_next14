import { apiFetch } from "./api-fetch";
import { searchArticles } from "@/lib/mongo/actions/articles/search";
import { youtubeApiFetch } from "../google/youtube/youtube-api";
import { cloneDeep } from "@/utils/object";

jest.mock("../../../../lib/mongo/actions/articles/search");
jest.mock("../google/youtube/youtube-api");
jest.mock("../../../../utils/object", () => ({
	cloneDeep: jest.fn((data) => data),
}));

describe("apiFetch", () => {
	const mockParams = { q: "test" };

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("returns error for invalid provider", async () => {
		const result = await apiFetch({
			params: mockParams,
			provider: "invalid-provider",
			queryId: "",
		});
		expect(result).toEqual({
			error: "Invalid API provider",
			items: [],
		});
	});

	it("calls searchArticles for articles-search-api provider", async () => {
		(searchArticles as jest.Mock).mockResolvedValueOnce({ items: [1, 2, 3] });
		(cloneDeep as jest.Mock).mockImplementation((data) => data);

		const result = await apiFetch({
			params: mockParams,
			provider: "articles-search-api",
			queryId: "",
		});

		expect(searchArticles).toHaveBeenCalledWith(mockParams);
		expect(cloneDeep).toHaveBeenCalledWith({ items: [1, 2, 3] });
		expect(result).toEqual({ items: [1, 2, 3] });
	});

	it("calls youtubeApiFetch for youtube-api provider", async () => {
		(youtubeApiFetch as jest.Mock).mockResolvedValueOnce({ items: ["a", "b"] });
		(cloneDeep as jest.Mock).mockImplementation((data) => data);

		const result = await apiFetch({
			params: mockParams,
			provider: "youtube-api",
			queryId: "",
		});

		expect(youtubeApiFetch).toHaveBeenCalledWith(mockParams);
		expect(cloneDeep).toHaveBeenCalledWith({ items: ["a", "b"] });
		expect(result).toEqual({ items: ["a", "b"] });
	});

	it("returns null for 'none' provider", async () => {
		const result = await apiFetch({
			params: mockParams,
			provider: "none",
			queryId: "",
		});
		expect(result).toEqual({
			error: "Invalid API provider",
			items: [],
		});
	});
});
