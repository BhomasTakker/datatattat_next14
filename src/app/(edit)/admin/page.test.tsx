import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "./page";

// Mock dependencies
jest.mock("../../page.module.scss", () => ({ page: "mocked-page-class" }));
jest.mock("../../../components/edit/edit-page", () => ({
	EditPage: ({ route, title, isAdminEdit }: any) => (
		<div>
			Mocked EditPage - {route} - {title} -{" "}
			{isAdminEdit ? "admin" : "not admin"}
		</div>
	),
}));
const connectToMongoDB = jest.fn();
const isValidSession = jest.fn();
const isSignupComplete = jest.fn();
const isValidUser = jest.fn();

jest.mock("../../../lib/mongo/db", () => ({
	connectToMongoDB: () => connectToMongoDB(),
}));
jest.mock("../../../actions/auth/check-session", () => ({
	__esModule: true,
	default: () => isValidSession(),
}));
jest.mock("../../../actions/signup/signup-completed", () => ({
	__esModule: true,
	default: () => isSignupComplete(),
}));
jest.mock("../../../actions/auth/check-valid-user", () => ({
	isValidUser: () => isValidUser(),
}));

describe("Admin Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders Unauthorized if user is not admin", async () => {
		isValidUser.mockResolvedValueOnce({ role: "user" });

		const { container } = render(await Page());
		const rendered = screen.getByText(/unauthorized/i);

		expect(rendered).toBeInTheDocument();
	});

	// redo this gumpth
	it("renders EditPage if user is admin", async () => {
		isValidUser.mockResolvedValueOnce({ role: "admin" });

		const { props } = await Page();

		// The returned element is a <div className={styles.page}>...</div>
		expect(props.className).toBe("mocked-page-class");
		expect(props.children.type).toBeDefined();
		expect(props.children.props.route).toBe("/");
		expect(props.children.props.title).toBe("Admin Edit");
		expect(props.children.props.isAdminEdit).toBe(true);
	});

	it("calls all required async functions", async () => {
		isValidUser.mockResolvedValueOnce({ role: "admin" });

		// @ts-ignore
		await Page();

		expect(connectToMongoDB).toHaveBeenCalled();
		expect(isValidSession).toHaveBeenCalled();
		expect(isSignupComplete).toHaveBeenCalled();
		expect(isValidUser).toHaveBeenCalled();
	});
});
