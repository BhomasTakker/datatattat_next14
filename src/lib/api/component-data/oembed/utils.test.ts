import { fetchOembedList, fetchOembed } from "./utils";
import { getOembed } from "../../../../actions/oembed/get-oembed";
import { OEmbed } from "@/types/data-structures/oembed";

jest.mock("../../../../actions/oembed/get-oembed");

describe("utils", () => {
	const mockGetOembed = getOembed as jest.MockedFunction<typeof getOembed>;
	const mockCreateUrl = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("fetchOembed", () => {
		const mockOembedData: OEmbed = {
			id: "test-id",
			title: "Test Title",
			type: "rich",
			version: "1.0",
			provider_name: "Test Provider",
			provider_url: "https://test-provider.com",
			html: "<div>Test HTML</div>",
			width: 560,
			height: 315,
		};

		it("should fetch oEmbed data successfully", async () => {
			const testItem = { id: "test", name: "Test Item" };
			const testUrl = "https://example.com/oembed?url=test";
			
			mockCreateUrl.mockReturnValue(testUrl);
			mockGetOembed.mockResolvedValue(mockOembedData);

			const result = await fetchOembed(testItem, mockCreateUrl);

			expect(mockCreateUrl).toHaveBeenCalledWith(testItem);
			expect(mockGetOembed).toHaveBeenCalledWith(testUrl);
			expect(result).toEqual(mockOembedData);
		});

		it("should reject when createUrl returns undefined", async () => {
			const testItem = { id: "test", name: "Test Item" };
			mockCreateUrl.mockReturnValue(undefined);

			await expect(fetchOembed(testItem, mockCreateUrl)).rejects.toBe("No URL provided");
			expect(mockCreateUrl).toHaveBeenCalledWith(testItem);
			expect(mockGetOembed).not.toHaveBeenCalled();
		});

		it("should reject when createUrl returns null", async () => {
			const testItem = { id: "test", name: "Test Item" };
			mockCreateUrl.mockReturnValue(null);

			await expect(fetchOembed(testItem, mockCreateUrl)).rejects.toBe("No URL provided");
			expect(mockCreateUrl).toHaveBeenCalledWith(testItem);
			expect(mockGetOembed).not.toHaveBeenCalled();
		});

		it("should reject when createUrl returns empty string", async () => {
			const testItem = { id: "test", name: "Test Item" };
			mockCreateUrl.mockReturnValue("");

			await expect(fetchOembed(testItem, mockCreateUrl)).rejects.toBe("No URL provided");
			expect(mockCreateUrl).toHaveBeenCalledWith(testItem);
			expect(mockGetOembed).not.toHaveBeenCalled();
		});

		it("should propagate errors from getOembed", async () => {
			const testItem = { id: "test", name: "Test Item" };
			const testUrl = "https://example.com/oembed?url=test";
			const testError = new Error("Fetch failed");
			
			mockCreateUrl.mockReturnValue(testUrl);
			mockGetOembed.mockRejectedValue(testError);

			await expect(fetchOembed(testItem, mockCreateUrl)).rejects.toThrow("Fetch failed");
			expect(mockCreateUrl).toHaveBeenCalledWith(testItem);
			expect(mockGetOembed).toHaveBeenCalledWith(testUrl);
		});
	});

	describe("fetchOembedList", () => {
		const mockOembedData: OEmbed = {
			id: "test-id",
			title: "Test Title",
			type: "rich",
			version: "1.0",
			provider_name: "Test Provider",
			provider_url: "https://test-provider.com",
			html: "<div>Test HTML</div>",
			width: 560,
			height: 315,
		};

		it("should fetch oEmbed data for all items in collection", async () => {
			const testCollection = [
				{ id: "1", name: "Item 1" },
				{ id: "2", name: "Item 2" },
				{ id: "3", name: "Item 3" },
			];
			
			mockCreateUrl.mockImplementation((item: any) => `https://example.com/oembed?url=${item.id}`);
			mockGetOembed.mockResolvedValue(mockOembedData);

			const result = await fetchOembedList(testCollection, mockCreateUrl);

			expect(result).toHaveLength(3);
			expect(result.every(item => item === mockOembedData)).toBe(true);
			expect(mockCreateUrl).toHaveBeenCalledTimes(3);
			expect(mockGetOembed).toHaveBeenCalledTimes(3);
		});

		it("should return null for items that fail to fetch", async () => {
			const testCollection = [
				{ id: "1", name: "Item 1" },
				{ id: "2", name: "Item 2" },
				{ id: "3", name: "Item 3" },
			];
			
			mockCreateUrl.mockImplementation((item: any) => {
				if (item.id === "2") return undefined; // This should cause an error
				return `https://example.com/oembed?url=${item.id}`;
			});
			mockGetOembed.mockResolvedValue(mockOembedData);

			// Mock console.error to avoid test output noise
			const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

			const result = await fetchOembedList(testCollection, mockCreateUrl);

			expect(result).toHaveLength(3);
			expect(result[0]).toEqual(mockOembedData);
			expect(result[1]).toBeNull();
			expect(result[2]).toEqual(mockOembedData);
			expect(consoleSpy).toHaveBeenCalledWith("Error fetching oEmbed:", "No URL provided");

			consoleSpy.mockRestore();
		});

		it("should handle empty collection", async () => {
			const testCollection: any[] = [];

			const result = await fetchOembedList(testCollection, mockCreateUrl);

			expect(result).toHaveLength(0);
			expect(mockCreateUrl).not.toHaveBeenCalled();
			expect(mockGetOembed).not.toHaveBeenCalled();
		});

		it("should handle mixed success and failure scenarios", async () => {
			const testCollection = [
				{ id: "1", name: "Item 1" },
				{ id: "2", name: "Item 2" },
				{ id: "3", name: "Item 3" },
			];
			
			mockCreateUrl.mockImplementation((item: any) => `https://example.com/oembed?url=${item.id}`);
			mockGetOembed.mockImplementation((url: string) => {
				if (url.includes("2")) {
					return Promise.reject(new Error("Network error"));
				}
				return Promise.resolve(mockOembedData);
			});

			// Mock console.error to avoid test output noise
			const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

			const result = await fetchOembedList(testCollection, mockCreateUrl);

			expect(result).toHaveLength(3);
			expect(result[0]).toEqual(mockOembedData);
			expect(result[1]).toBeNull();
			expect(result[2]).toEqual(mockOembedData);
			expect(consoleSpy).toHaveBeenCalledWith("Error fetching oEmbed:", expect.any(Error));

			consoleSpy.mockRestore();
		});
	});
});
