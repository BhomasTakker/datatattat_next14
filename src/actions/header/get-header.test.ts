/**
 * @jest-environment node
 */

import "@testing-library/jest-dom";
import {
	getMainHeader,
	getSubHeaders,
	isProtectedRoute,
	trimHeader,
} from "./get-header";

// we can have a mocks folder but - can we call a shortcut finction to mock the module?
jest.mock("../../lib/mongo/actions/header", () => {
	return {
		getHeader: jest.fn().mockResolvedValue({
			route: "/mock-route",
			nav: [
				{
					label: "mock-label",
					route: "/mock-sub-route",
				},
			],
		}),
	};
});

jest.mock("../../utils/object", () => {
	return {
		cloneDeep: jest.fn().mockImplementation((obj) => obj),
	};
});

const mockHeader = {
	route: "/mock-route",
	nav: [
		{
			label: "mock-label",
			route: "/mock-sub-route",
		},
	],
};

describe("get-header action test suite", () => {
	describe("trimHeader", () => {
		it("Return the parent route from a given route", () => {
			const result = trimHeader("/string/string/string/remove-me");
			expect(result).toEqual("/string/string/string");
		});
	});

	describe("isProtectedRoute", () => {
		it("Return true for protected routes", () => {
			expect(isProtectedRoute("/")).toBe(true);
			expect(isProtectedRoute("/users")).toBe(true);
		});

		it("Return false for unprotected routes", () => {
			expect(isProtectedRoute("/whatever")).toBe(false);
		});
	});

	describe("getMainHeader", () => {
		it("should return the main header", async () => {
			const header = await getMainHeader();
			expect(header).toEqual(mockHeader);
		});
	});

	describe("getSubHeaders", () => {
		it("should return an empty array for protected routes", async () => {
			const subHeaders = await getSubHeaders("/");
			expect(subHeaders).toEqual([]);
		});

		it("should return one mocked header", async () => {
			const subHeaders = await getSubHeaders("/mock-route");
			expect(subHeaders).toEqual([mockHeader]);
		});

		it("should return two mocked headers", async () => {
			const subHeaders = await getSubHeaders("/mock-route/sub-route");
			expect(subHeaders).toEqual([mockHeader, mockHeader]);
		});
	});
});
