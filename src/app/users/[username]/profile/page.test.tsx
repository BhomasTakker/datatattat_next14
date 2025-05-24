import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import UserProfile from "./page";
import { redirect } from "next/navigation";
import { PATHS } from "@/lib/routing/paths";
const mockGetUserByUsername =
	require("../../../../lib/mongo/actions/user").getUserByUsername;
const mockGetUser = require("../../../../actions/user/get-user").getUser;

// Mock dependencies
jest.mock("../../../../lib/mongo/actions/user", () => ({
	getUserByUsername: jest.fn(),
}));
jest.mock("../../../../actions/user/get-user", () => ({
	getUser: jest.fn(),
}));
jest.mock("../../../../lib/mongo/db", () => ({
	connectToMongoDB: jest.fn(),
}));
jest.mock("../../../../components/profile/profile-page", () => ({
	ProfilePage: ({ user }: any) => (
		<div data-testid="profile-page">{user.username}</div>
	),
}));
jest.mock("../../../../components/profile/profile-edit-page", () => ({
	ProfileEditPage: () => <div data-testid="profile-edit-page">Edit Page</div>,
}));
jest.mock("../../../../components/header/main-header", () => ({
	MainHeader: ({ route }: any) => (
		<div data-testid="main-header">{route.join("/")}</div>
	),
}));
jest.mock("next/navigation", () => ({
	redirect: jest.fn(),
}));

describe("UserProfile page", () => {
	const username = "testuser";
	const params = Promise.resolve({ username });

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders ProfileEditPage if session user matches profile user", async () => {
		const user = { _id: "123", username, avatar: "avatar.png" };
		mockGetUser.mockResolvedValue(user);
		mockGetUserByUsername.mockResolvedValue(user);

		const { container } = render(await UserProfile({ params }));

		expect(container).toMatchSnapshot();
		expect(screen.getByTestId("main-header")).toHaveTextContent(
			`users/${username}`
		);
		expect(screen.getByTestId("profile-edit-page")).toBeInTheDocument();
	});

	it("renders ProfilePage if session user does not match profile user", async () => {
		const sessionUser = { _id: "123", username: "otheruser" };
		const profileUser = { _id: "456", username, avatar: "avatar.png" };
		mockGetUser.mockResolvedValue(sessionUser);
		mockGetUserByUsername.mockResolvedValue(profileUser);

		const { container } = render(await UserProfile({ params }));

		expect(container).toMatchSnapshot();
		expect(screen.getByTestId("main-header")).toHaveTextContent(
			`users/${username}`
		);
		expect(screen.getByTestId("profile-page")).toHaveTextContent(username);
	});

	it("redirects to home if profile user does not exist", async () => {
		mockGetUser.mockResolvedValue({ _id: "123", username: "otheruser" });
		mockGetUserByUsername.mockResolvedValue(null);

		render(await UserProfile({ params }));

		expect(redirect).toHaveBeenCalledWith(PATHS.home());
	});
});
