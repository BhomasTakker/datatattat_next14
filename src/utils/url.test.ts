import { isStringValidURL } from "./url";

describe("URL Utils", () => {
	describe("isStringValidURL", () => {
		beforeEach(() => {
			console.error = jest.fn();
		});
		afterEach(() => {
			jest.clearAllMocks();
		});
		it("should return true for a valid URL", () => {
			const validURL = "https://www.example.com";
			expect(isStringValidURL(validURL)).toBe(true);
		});

		it("should return false for an invalid URL", () => {
			const invalidURL = "invalid-url";
			expect(isStringValidURL(invalidURL)).toBe(false);
			expect(console.error).toHaveBeenCalledTimes(1);
		});

		it("should handle edge cases", () => {
			const edgeCaseURL = "http://localhost:3000";
			expect(isStringValidURL(edgeCaseURL)).toBe(true);
		});
	});
});
