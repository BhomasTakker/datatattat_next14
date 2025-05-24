import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "./page";

// Mock dependencies
jest.mock("../../../../page.module.scss", () => ({
	page: "mocked-page-class",
}));
jest.mock("../../../../../components/edit/edit-page", () => ({
	EditPage: ({ route, title }: { route: string; title: string }) => (
		<div data-testid="edit-page">
			{route} - {title}
		</div>
	),
}));
jest.mock("../../../../../lib/routing/paths", () => ({
	PATHS: { users: () => "/users" },
}));
const mockConnectToMongoDB = jest.fn();
const mockIsValidSession = jest.fn();
const mockIsSignupComplete = jest.fn();
const mockIsValidUser = jest.fn();

jest.mock("../../../../../lib/mongo/db", () => ({
	connectToMongoDB: () => mockConnectToMongoDB(),
}));
jest.mock("../../../../../actions/auth/check-session", () => ({
	__esModule: true,
	default: () => mockIsValidSession(),
}));
jest.mock("../../../../../actions/signup/signup-completed", () => ({
	__esModule: true,
	default: () => mockIsSignupComplete(),
}));
jest.mock("../../../../../actions/auth/check-valid-user", () => ({
	isValidUser: () => mockIsValidUser(),
}));

describe("Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders EditPage when route starts with username", async () => {
		mockIsValidUser.mockResolvedValue({ username: "john" });
		const params = Promise.resolve({ route: ["john", "profile"] });

		render(await Page({ params }));

		expect(screen.getByTestId("edit-page")).toBeInTheDocument();
		expect(screen.getByText("/users/john/profile - Edit")).toBeInTheDocument();
	});

	it("renders Unauthorized when route does not start with username", async () => {
		mockIsValidUser.mockResolvedValue({ username: "john" });
		const params = Promise.resolve({ route: ["jane", "profile"] });

		render(await Page({ params }));

		expect(screen.getByText("Unauthorized")).toBeInTheDocument();
	});

	it("decodes URI in route and checks against username", async () => {
		mockIsValidUser.mockResolvedValue({ username: "john doe" });
		const params = Promise.resolve({ route: ["john%20doe", "profile"] });

		render(await Page({ params }));

		expect(screen.getByTestId("edit-page")).toBeInTheDocument();
		expect(
			screen.getByText("/users/john%20doe/profile - Edit")
		).toBeInTheDocument();
	});

	it("calls all required async functions", async () => {
		mockIsValidUser.mockResolvedValue({ username: "john" });
		const params = Promise.resolve({ route: ["john"] });

		render(await Page({ params }));

		expect(mockConnectToMongoDB).toHaveBeenCalled();
		expect(mockIsValidSession).toHaveBeenCalled();
		expect(mockIsSignupComplete).toHaveBeenCalled();
		expect(mockIsValidUser).toHaveBeenCalled();
	});
});
