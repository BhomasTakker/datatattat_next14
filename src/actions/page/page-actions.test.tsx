/**
 * @jest-environment node
 */

import { getPageByRoute } from "../../lib/mongo/actions/page";
import "@testing-library/jest-dom";
import { getPage } from "./page-actions";
import { redirect } from "next/navigation";
import { PATHS } from "@/lib/routing/paths";

jest.mock("../../lib/mongo/actions/page", () => {
	return {
		getPageByRoute: jest.fn().mockResolvedValue({
			id: "mock-object",
		}),
	};
});

// Interesting method of mocking
jest.mock("next/navigation");
jest.mocked(redirect).mockImplementation((url: string) => {
	throw new Error(`Redirecting to: ${url}`);
});

// const structuredCloneSpy = jest.spyOn("next/navigation", "redirect");

describe("getPage", () => {
	it("returns a page object", async () => {
		const page = await getPage("/mock-route");
		expect(page).toEqual({ id: "mock-object" });
	});

	it("redirects to home if a 404 routye is passed", async () => {
		const badRoute = "/bad-route";
		(getPageByRoute as jest.Mock).mockResolvedValue(null);
		try {
			await getPage(badRoute);
		} catch (error) {
			expect((error as Error).message).toMatch(
				`Redirecting to: ${PATHS.home()}`
			);
		}
	});
});
