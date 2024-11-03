/**
 * @jest-environment node
 */

import { getPageByRoute } from "../../lib/mongo/actions/page";
import "@testing-library/jest-dom";
import { getPage } from "./page-actions";

jest.mock("../../lib/mongo/actions/page", () => {
	return {
		getPageByRoute: jest.fn().mockResolvedValue({
			id: "mock-object",
		}),
	};
});

describe("getPage", () => {
	it("returns a page object", async () => {
		const page = await getPage("/mock-route");
		expect(page).toEqual({ id: "mock-object" });
	});

	it("throws an error if no page is found", async () => {
		(getPageByRoute as jest.Mock).mockResolvedValue(null);
		try {
			await getPage("/bad-route");
		} catch (error) {
			expect((error as Error).message).toMatch(
				"Page not found for route: /bad-route"
			);
		}
	});
});
