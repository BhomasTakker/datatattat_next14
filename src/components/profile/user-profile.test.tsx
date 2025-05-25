import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserProfile } from "./user-profile";

describe("UserProfile", () => {
	const mockUser = {
		username: "Jane Doe",
		email: "jane@example.com",
		avatar: "https://example.com/avatar.jpg",
	};
	const authorizedUser = {
		...mockUser,
		_id: "12345",
		role: "admin",
		signin_method: "email",
		signin_name: "Jane Doe",
		signin_email: "anEmail@emailProvider.com",
	};

	it("renders user name", () => {
		render(<UserProfile user={mockUser} />);
		expect(screen.getByText("Jane Doe")).toBeInTheDocument();
	});

	it("renders user avatar", () => {
		render(<UserProfile user={mockUser} />);
		const avatar = screen.getByAltText(/Jane Doe/);
		expect(avatar).toBeInTheDocument();
		expect(avatar).toHaveAttribute("src", mockUser.avatar);
	});

	it("does not render restricted info without authorization", () => {
		const unauthorizedUser = {
			...authorizedUser,
			_id: undefined,
		};
		render(<UserProfile user={unauthorizedUser} />);
		expect(screen.queryByText(unauthorizedUser.role)).not.toBeInTheDocument();
	});

	it("renders restricted info when user is authorized", () => {
		// @ts-expect-error _id is not a string
		render(<UserProfile user={authorizedUser} />);

		// second render
		expect(screen.queryByText("user role:- admin")).toBeInTheDocument();
		expect(screen.queryByText("email")).toBeInTheDocument();
		expect(screen.queryAllByText("Jane Doe")).toHaveLength(2);
		expect(screen.queryByText("user_id:- 12345")).toBeInTheDocument();
	});

	describe("Snaps", () => {
		it("unauthorized user matches snapshot", () => {
			const { asFragment } = render(<UserProfile user={mockUser} />);
			expect(asFragment()).toMatchSnapshot();
		});
		it("authorized user matches snapshot", () => {
			// @ts-expect-error _id is not a string
			const { asFragment } = render(<UserProfile user={authorizedUser} />);
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
