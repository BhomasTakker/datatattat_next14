import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "./page";
import { PATHS } from "@/lib/routing/paths";
import { isValidUser } from "@/actions/auth/check-valid-user";
import isValidSession from "@/actions/auth/check-session";
import isSignupComplete from "@/actions/signup/signup-completed";
import { connectToMongoDB } from "@/lib/mongo/db";

// Mock dependencies
jest.mock("../../../page.module.scss", () => ({ page: "mocked-page-class" }));
jest.mock("../../../../components/edit/edit-page", () => ({
	EditPage: ({ route, title, isAdminEdit }: any) => (
		<div
			data-testid="edit-page"
			data-route={route}
			data-title={title}
			data-admin={isAdminEdit ? "true" : "false"}
		/>
	),
}));
jest.mock("../../../../lib/routing/paths", () => ({
	PATHS: { home: jest.fn(() => "/home") },
}));
jest.mock("../../../../actions/auth/check-session", () =>
	jest.fn(() => Promise.resolve())
);
jest.mock("../../../../actions/signup/signup-completed", () =>
	jest.fn(() => Promise.resolve())
);
jest.mock("../../../../actions/auth/check-valid-user", () => ({
	isValidUser: jest.fn(),
}));
jest.mock("../../../../lib/mongo/db", () => ({
	connectToMongoDB: jest.fn(() => Promise.resolve()),
}));

describe("Page", () => {
	const mockParams = (routeArr: string[]) =>
		Promise.resolve({ route: routeArr });

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders Unauthorized if user is not admin", async () => {
		(isValidUser as jest.Mock).mockResolvedValueOnce({ role: "user" });

		// @ts-ignore
		const { default: PageComponent } = await import("./page");
		const result = await PageComponent({ params: mockParams(["foo", "bar"]) });

		// Render the returned React element
		render(result);
		expect(screen.getByText("Unauthorized")).toBeInTheDocument();
	});

	it("renders EditPage if user is admin", async () => {
		(isValidUser as jest.Mock).mockResolvedValueOnce({ role: "admin" });

		// @ts-ignore
		const { default: PageComponent } = await import("./page");
		const result = await PageComponent({ params: mockParams(["foo", "bar"]) });

		render(result);

		const editPage = screen.getByTestId("edit-page");
		expect(editPage).toBeInTheDocument();
		expect(editPage).toHaveAttribute("data-route", "/foo/bar");
		expect(editPage).toHaveAttribute("data-title", "Admin Edit");
		expect(editPage).toHaveAttribute("data-admin", "true");
	});

	it("calls connectToMongoDB, isValidSession, isSignupComplete, and isValidUser", async () => {
		(isValidUser as jest.Mock).mockResolvedValueOnce({ role: "admin" });

		// @ts-ignore
		const { default: PageComponent } = await import("./page");
		await PageComponent({ params: mockParams(["foo"]) });

		expect(connectToMongoDB).toHaveBeenCalled();
		expect(isValidSession).toHaveBeenCalled();
		expect(isSignupComplete).toHaveBeenCalled();
		expect(isValidUser).toHaveBeenCalled();
	});
});
