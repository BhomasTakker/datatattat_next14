import { redirect } from "next/navigation";
import { PATHS } from "@/lib/routing/paths";
import { connectToMongoDB } from "@/lib/mongo/db";
import isSignupComplete from "@/actions/signup/signup-completed";
import Page from "./page";

import { render, screen, waitFor } from "@testing-library/react";

const mockIsValidUser = jest.fn();
const isValidSession = jest.fn();

// jest.mock("../../../../lib/mongo/db");
jest.mock("../../../../actions/auth/check-session");
jest.mock("../../../../actions/auth/check-valid-user", () => ({
	isValidUser: () => mockIsValidUser(),
}));
jest.mock("../../../../actions/signup/signup-completed");
jest.mock("../../../../lib/routing/paths", () => ({
	PATHS: {
		users: jest.fn(() => "/users"),
		edit: "/edit",
	},
}));

jest.mock("../../../../actions/user/get-user", () => ({
	getUser: jest.fn(),
}));

jest.mock("../../../../actions/auth/check-session", () => ({
	__esModule: true,
	default: () => isValidSession(),
}));

describe("Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("calls all auth and db functions and redirects to the correct path", async () => {
		mockIsValidUser.mockResolvedValue({ username: "testuser" });

		// @ts-expect-error react node vs jsx.Element
		render(await Page());

		expect(connectToMongoDB).toHaveBeenCalled();
		expect(isValidSession).toHaveBeenCalled();
		expect(isSignupComplete).toHaveBeenCalled();
		expect(mockIsValidUser).toHaveBeenCalled();

		expect(PATHS.users).toHaveBeenCalled();
		expect(redirect).toHaveBeenCalledWith("/edit/users/testuser");
	});

	it("redirects with the correct username from isValidUser", async () => {
		mockIsValidUser.mockResolvedValue({ username: "alice" });

		// @ts-expect-error react node vs jsx.Element
		render(await Page());

		expect(redirect).toHaveBeenCalledWith("/edit/users/alice");
	});

	it("throws if isValidUser does not return username", async () => {
		mockIsValidUser.mockResolvedValue({});

		// @ts-expect-error react node vs jsx.Element
		render(await Page());

		// The redirect will be called with "/edit/users/undefined"
		expect(redirect).toHaveBeenCalledWith("/edit/users/undefined");
	});
});
