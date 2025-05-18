import { randomThreeDigits } from "./math";

describe("Math utils", () => {
	describe("randonmThreeDigits", () => {
		it("should return a number between 100 and 999", () => {
			const randomNumber = randomThreeDigits();
			expect(randomNumber).toBeGreaterThanOrEqual(100);
			expect(randomNumber).toBeLessThanOrEqual(999);
		});
	});
});
