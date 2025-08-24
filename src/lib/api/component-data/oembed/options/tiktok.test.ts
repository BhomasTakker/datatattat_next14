import { tiktokOembed } from "./tiktok";
import { TikTokOEmbedParams } from "@/types/data-structures/oembed";
import { createQueryParameters } from "../oembed-query-params";
import { OembedOptions } from "../oembed-options";

jest.mock("../oembed-query-params");

describe("tiktokOembed", () => {
	const mockQueryParams = "foo=bar&baz=qux";

	beforeEach(() => {
		(createQueryParameters as jest.Mock).mockReturnValue(mockQueryParams);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should have the correct script URL", () => {
		expect(tiktokOembed.script).toBe("https://www.tiktok.com/embed.js");
	});

	it("should generate the correct oEmbed URL", () => {
		const params: TikTokOEmbedParams = {
			account: "testuser",
			videoId: "1234567890123456789",
			variant: OembedOptions.tiktok,
		};
		const expectedUrl =
			"https://www.tiktok.com/oembed?url=" +
			encodeURIComponent(
				"https://www.tiktok.com/@testuser/video/1234567890123456789"
			) +
			`&${mockQueryParams}`;

		const result = tiktokOembed.createUrl(params);
		expect(result).toBe(expectedUrl);
		expect(createQueryParameters).toHaveBeenCalled();
	});

	it("should encode special characters in account and videoId", () => {
		const params: TikTokOEmbedParams = {
			account: "user@with+special",
			videoId: "video/id?with&special=chars",
			variant: OembedOptions.tiktok,
		};
		const expectedTikTokUrl =
			"https://www.tiktok.com/@user@with+special/video/video/id?with&special=chars";
		const expectedUrl =
			"https://www.tiktok.com/oembed?url=" +
			encodeURIComponent(expectedTikTokUrl) +
			`&${mockQueryParams}`;

		const result = tiktokOembed.createUrl(params);
		expect(result).toBe(expectedUrl);
	});

	it("should call createQueryParameters when generating the URL", () => {
		const params: TikTokOEmbedParams = {
			account: "anotheruser",
			videoId: "9876543210987654321",
			variant: OembedOptions.tiktok,
		};

		tiktokOembed.createUrl(params);
		expect(createQueryParameters).toHaveBeenCalled();
	});

	it("should handle empty account and videoId", () => {
		const params: TikTokOEmbedParams = {
			account: "",
			videoId: "",
			variant: OembedOptions.tiktok,
		};
		const expectedUrl =
			"https://www.tiktok.com/oembed?url=" +
			encodeURIComponent("https://www.tiktok.com/@/video/") +
			`&${mockQueryParams}`;

		const result = tiktokOembed.createUrl(params);
		expect(result).toBe(expectedUrl);
	});
});
