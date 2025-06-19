import { stripHTML } from "./html";
import * as cheerio from "cheerio";

describe("html utils", () => {
	it("should pass html string to Cheerio to be cleaned.", () => {
		const htmlString = "<div>Hello <strong>World</strong></div>";
		stripHTML(htmlString);
		const loadSpy = jest.spyOn(cheerio, "load").mockImplementation();
		expect(loadSpy).toHaveBeenCalledWith(htmlString);
	});

	it("should return an empty string for invalid input", () => {
		const result = stripHTML("");
		expect(result).toBe("");
	});
});
