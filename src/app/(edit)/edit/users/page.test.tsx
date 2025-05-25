import { redirect } from "next/navigation";
import { PATHS } from "@/lib/routing/paths";
import { connectToMongoDB } from "@/lib/mongo/db";
import { isValidUser } from "@/actions/auth/check-valid-user";
import isSignupComplete from "@/actions/signup/signup-completed";
import Page from "./page";
import { Profile } from "@/lib/next-auth/types";

import { render, screen, waitFor } from "@testing-library/react";

const mockIsValidUser = jest.fn();
const isValidSession = jest.fn();

jest.mock("../../../../lib/mongo/db");
jest.mock("../../../../actions/auth/check-session");
jest.mock("../../../../actions/auth/check-valid-user", () => ({
	isValidUser: () => mockIsValidUser(),
}));
jest.mock("../../../../actions/signup/signup-completed");
jest.mock("next/navigation", () => ({
	redirect: jest.fn(),
}));
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

jest.mock("../../../../lib/next-auth/providers/github", () => ({
	GITHUB: {
		id: "github",
		name: "GitHub",
		type: "oauth",
		version: "2.0",
		scope: "read:user user:email",
		profile(profile: Profile) {
			return { id: profile.id, name: profile.name, email: profile.email };
		},
	},
}));

jest.mock("../../../../lib/next-auth/providers/google", () => ({
	GOOGLE: {
		id: "google",
		name: "Google",
		type: "oauth",
		version: "2.0",
		scope: "read:user user:email",
		profile(profile: Profile) {
			return { id: profile.id, name: profile.name, email: profile.email };
		},
	},
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
