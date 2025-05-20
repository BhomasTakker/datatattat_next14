import { rssParse } from "./rss-parse";
import Parser from "rss-parser";

jest.mock("rss-parser");

const mockParseURL = jest.fn();

beforeEach(() => {
	jest.clearAllMocks();
	(Parser as jest.Mock).mockImplementation(() => ({
		parseURL: mockParseURL,
	}));
});

describe("rssParse", () => {
	it("should call Parser.parseURL with the endpoint", async () => {
		const endpoint = "http://example.com/rss";
		const expectedResult = { title: "Test Feed" };
		mockParseURL.mockResolvedValue(expectedResult);

		const result = await rssParse(endpoint);

		expect(Parser).toHaveBeenCalledWith({
			customFields: undefined,
			timeout: 5000,
		});
		expect(mockParseURL).toHaveBeenCalledWith(endpoint);
		expect(result).toBe(expectedResult);
	});

	it("should pass customFields to Parser", async () => {
		const endpoint = "http://example.com/rss";
		const customFields = { item: ["customField"] };
		mockParseURL.mockResolvedValue({});

		await rssParse(endpoint, customFields);

		expect(Parser).toHaveBeenCalledWith({
			customFields,
			timeout: 5000,
		});
	});

	it("should return null and log error if parseURL throws", async () => {
		const endpoint = "http://example.com/rss";
		const error = new Error("Timeout");
		mockParseURL.mockRejectedValue(error);
		const consoleSpy = jest.spyOn(console, "error").mockImplementation();

		const result = await rssParse(endpoint);

		expect(result).toBeNull();
		expect(consoleSpy).toHaveBeenCalledWith(
			"Error fetching rss rssParse",
			endpoint,
			error
		);

		consoleSpy.mockRestore();
	});
});
