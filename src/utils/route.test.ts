import { getCurrentRoute } from "./route";

jest.mock("next/headers", () => {
	return {
		__esModule: true,
		headers: async () => ({
			get: (header: string) => `/${header}-mock-route`,
		}),
	};
});

describe("route utils", () => {
	describe("getCurrentRoute", () => {
		it("should return the current route", async () => {
			const mockCurrentRoute = await getCurrentRoute();
			expect(mockCurrentRoute).toBe("/x-pathname-mock-route");
		});
	});
});
