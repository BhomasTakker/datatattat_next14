import { oembedFetch } from "./oembed-fetch";
import { getOembed } from "../../../../actions/oembed/get-oembed";
import { getOembedObject } from "./oembed-options";

// Mock dependencies
jest.mock("../../../../actions/oembed/get-oembed");
jest.mock("./oembed-options");

const mockGetOembed = getOembed as jest.Mock;
const mockGetOembedObject = getOembedObject as jest.Mock;

describe("oembedFetch", () => {
	const baseParams = {
		variant: "youtube",
		other: "param",
	};

	const mockQuery = {
		params: baseParams,
	};

	const mockOembedCreator = {
		createUrl: jest.fn(),
		script: "<script src='test.js'></script>",
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("returns null and logs error if no oEmbed creator found", async () => {
		mockGetOembedObject.mockReturnValue(undefined);
		const consoleSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});
		const result = await oembedFetch(mockQuery as any);
		expect(result).toBeNull();
		expect(consoleSpy).toHaveBeenCalledWith(
			"No oEmbed creator found for variant:",
			"youtube"
		);
		consoleSpy.mockRestore();
	});

	it("rejects if createUrl returns falsy value", async () => {
		mockGetOembedObject.mockReturnValue(mockOembedCreator);
		mockOembedCreator.createUrl.mockReturnValue(undefined);

		await expect(oembedFetch(mockQuery as any)).rejects.toEqual(
			"No URL provided"
		);
	});

	it("rejects if oEmbed response has no html", async () => {
		mockGetOembedObject.mockReturnValue(mockOembedCreator);
		mockOembedCreator.createUrl.mockReturnValue("http://test.url");
		mockGetOembed.mockResolvedValue({ html: undefined });

		await expect(oembedFetch(mockQuery as any)).rejects.toEqual(
			"No HTML found in oEmbed response"
		);
	});

	it("returns oEmbed data and script on success", async () => {
		const oembedResponse = { html: "<iframe></iframe>", title: "Test" };
		mockGetOembedObject.mockReturnValue(mockOembedCreator);
		mockOembedCreator.createUrl.mockReturnValue("http://test.url");
		mockGetOembed.mockResolvedValue(oembedResponse);

		const result = await oembedFetch(mockQuery as any);
		expect(result).toEqual({
			oembed: oembedResponse,
			script: mockOembedCreator.script,
		});
	});

	it("returns null and logs error if getOembed throws", async () => {
		mockGetOembedObject.mockReturnValue(mockOembedCreator);
		mockOembedCreator.createUrl.mockReturnValue("http://test.url");
		mockGetOembed.mockRejectedValue(new Error("Network error"));
		const consoleSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		const result = await oembedFetch(mockQuery as any);
		expect(result).toBeNull();
		expect(consoleSpy).toHaveBeenCalledWith(
			"Error fetching oEmbed data:",
			expect.any(Error)
		);
		consoleSpy.mockRestore();
	});
});
