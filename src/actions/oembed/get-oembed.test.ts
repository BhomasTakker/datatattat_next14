import { getOembed } from "./get-oembed";
import { OEmbed } from "@/types/data-structures/oembed";

global.fetch = jest.fn();

describe("getOembed", () => {
	const mockUrl = "https://example.com/oembed";
	const mockOEmbed: OEmbed = {
		type: "video",
		version: "1.0",
		title: "Test Video",
		author_name: "Author",
		author_url: "https://example.com/author",
		provider_name: "Provider",
		provider_url: "https://example.com",
		html: "<iframe></iframe>",
		width: 640,
		height: 360,
		thumbnail_url: "https://example.com/thumb.jpg",
		thumbnail_width: 640,
		thumbnail_height: 360,
		id: "12345",
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch oEmbed data and return it as OEmbed", async () => {
		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: jest.fn().mockResolvedValueOnce(mockOEmbed),
		});

		const result = await getOembed(mockUrl);
		expect(fetch).toHaveBeenCalledWith(mockUrl);
		expect(result).toEqual(mockOEmbed);
	});

	it("should throw an error if response is not ok", async () => {
		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 404,
		});

		await expect(getOembed(mockUrl)).rejects.toThrow("HTTP error! status: 404");
	});

	it("should throw an error if fetch fails", async () => {
		(fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

		await expect(getOembed(mockUrl)).rejects.toThrow(
			"Failed to fetch oEmbed data: Error: Network error"
		);
	});
});
