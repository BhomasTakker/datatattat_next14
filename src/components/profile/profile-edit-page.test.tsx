import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ProfileEditPage } from "./profile-edit-page";
import { isValidUser } from "@/actions/auth/check-valid-user";

// Mock dependencies
jest.mock("./complete-signup/complete-signup", () => ({
	CompleteSignup: ({ username }: { username: string }) => (
		<div data-testid="complete-signup">CompleteSignup: {username}</div>
	),
}));
jest.mock("./user-profile", () => ({
	UserProfile: ({ user }: { user: any }) => (
		<div data-testid="user-profile">UserProfile: {user.username}</div>
	),
}));
jest.mock("../../actions/auth/check-valid-user", () => ({
	isValidUser: jest.fn(),
}));

describe("ProfileEditPage", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders CompleteSignup if signup is not completed", async () => {
		(isValidUser as jest.Mock).mockResolvedValue({
			signup_completed: false,
			username: "testuser",
		});

		render(await ProfileEditPage());

		expect(screen.getByTestId("complete-signup")).toHaveTextContent(
			"CompleteSignup: testuser"
		);
		expect(screen.queryByTestId("user-profile")).toBeNull();
	});

	it("renders UserProfile if signup is completed", async () => {
		(isValidUser as jest.Mock).mockResolvedValue({
			signup_completed: true,
			username: "testuser",
		});

		render(await ProfileEditPage());

		expect(screen.getByTestId("user-profile")).toHaveTextContent(
			"UserProfile: testuser"
		);
		expect(screen.queryByTestId("complete-signup")).toBeNull();
	});

	it("passes the full user object to UserProfile", async () => {
		const user = {
			signup_completed: true,
			username: "fulluser",
			email: "fulluser@example.com",
		};
		(isValidUser as jest.Mock).mockResolvedValue(user);

		render(await ProfileEditPage());

		expect(screen.getByTestId("user-profile")).toHaveTextContent(
			"UserProfile: fulluser"
		);
	});
});
