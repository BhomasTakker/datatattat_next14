import React from "react";
import { render, screen } from "@testing-library/react";
import { ProfilePage } from "./profile-page";

// Mock the UserProfile component
jest.mock("./user-profile", () => ({
	UserProfile: ({ user }: any) => (
		<div data-testid="user-profile-mock">
			{user.username} - {user.avatar}
		</div>
	),
}));

describe("ProfilePage", () => {
	const mockUser = {
		username: "testuser",
		avatar: "avatar.png",
	};

	it("renders without crashing", () => {
		render(<ProfilePage user={mockUser} />);
		expect(screen.getByTestId("user-profile-mock")).toBeInTheDocument();
	});

	it("passes the correct user props to UserProfile", () => {
		render(<ProfilePage user={mockUser} />);
		expect(screen.getByText(/testuser/)).toBeInTheDocument();
		expect(screen.getByText(/avatar.png/)).toBeInTheDocument();
	});

	it("renders the UserProfile component", () => {
		render(<ProfilePage user={mockUser} />);
		expect(screen.getByTestId("user-profile-mock")).toBeVisible();
	});
});
