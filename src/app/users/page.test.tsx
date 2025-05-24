import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "./page";
import { redirect } from "next/navigation";
import { PATHS } from "@/lib/routing/paths";
import { ReactNode } from "react";

jest.mock("next/navigation", () => ({
	redirect: jest.fn(),
}));

describe("Incorrect User Page ", () => {
	it("redirects to home", async () => {
		render((await Page()) as ReactNode);

		expect(redirect).toHaveBeenCalledWith(PATHS.home());
	});
});
