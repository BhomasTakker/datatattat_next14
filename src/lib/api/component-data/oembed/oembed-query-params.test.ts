import { createQueryParameters } from "./oembed-query-params";

describe("createQueryParameters", () => {
	it("should return a query string with omit_script=1", () => {
		const result = createQueryParameters();
		expect(result).toBe("omit_script=1");
	});

	it("should return a string", () => {
		const result = createQueryParameters();
		expect(typeof result).toBe("string");
	});

	it("should not include any other parameters", () => {
		const result = createQueryParameters();
		const params = new URLSearchParams(result);
		expect(Array.from(params.keys())).toEqual(["omit_script"]);
		expect(params.get("omit_script")).toBe("1");
	});
});
