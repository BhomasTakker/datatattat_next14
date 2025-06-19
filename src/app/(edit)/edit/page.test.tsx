import { redirect } from "next/navigation";
import { PATHS } from "@/lib/routing/paths";
import isSignupComplete from "@/actions/signup/signup-completed";
import isValidSession from "@/actions/auth/check-session";
import { isValidUser } from "@/actions/auth/check-valid-user";
import { connectToMongoDB } from "@/lib/mongo/db";
import Page from "./page";
import { render } from "@testing-library/react";

jest.mock("../../../lib/routing/paths", () => ({
	PATHS: {
		user: (username: string) => `/user/${username}`,
		edit: () => "/edit",
	},
}));
jest.mock("../../../actions/signup/signup-completed", () => jest.fn());
jest.mock("../../../actions/auth/check-session", () => jest.fn());
jest.mock("../../../actions/auth/check-valid-user", () => ({
	isValidUser: jest.fn(),
}));
jest.mock("../../../lib/mongo/db", () => ({
	connectToMongoDB: jest.fn(),
}));

describe("Page", () => {
	beforeEach(() => {
		console.error = jest.fn();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("calls all required functions and redirects to the correct path", async () => {
		(connectToMongoDB as jest.Mock).mockResolvedValue(undefined);
		(isValidSession as jest.Mock).mockResolvedValue(undefined);
		(isSignupComplete as jest.Mock).mockResolvedValue(undefined);
		(isValidUser as jest.Mock).mockResolvedValue({ username: "testuser" });

		await Page();

		expect(connectToMongoDB).toHaveBeenCalled();
		expect(isValidSession).toHaveBeenCalled();
		expect(isSignupComplete).toHaveBeenCalled();
		expect(isValidUser).toHaveBeenCalled();
		expect(redirect).toHaveBeenCalledWith("/edit/user/testuser");
	});

	it("redirects with the correct username", async () => {
		(isValidUser as jest.Mock).mockResolvedValue({ username: "alice" });

		await Page();

		expect(redirect).toHaveBeenCalledWith("/edit/user/alice");
	});

	it("logs an error to console and returns null ifno valid user found", async () => {
		(isValidUser as jest.Mock).mockResolvedValue({});

		render(await Page());
		expect(console.error).toHaveBeenCalledWith(
			"User is not valid or username is missing."
		);

		const result = await Page();
		expect(result).toBeNull();
	});

	it("throws if connectToMongoDB fails", async () => {
		(connectToMongoDB as jest.Mock).mockRejectedValue(new Error("DB error"));

		await expect(Page()).rejects.toThrow("DB error");
	});
});
