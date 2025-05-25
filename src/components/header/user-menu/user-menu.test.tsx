import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { UserMenu } from "./user-menu";

// Mock the MenuDropDown component
jest.mock("./drop-down/menu-drop-down", () => ({
	MenuDropDown: ({ isOpen, username, avatar }: any) =>
		isOpen ? (
			<div data-testid="dropdown">
				<span>{username}</span>
				<img src={avatar} alt="avatar" />
			</div>
		) : null,
}));

// Mock the styles import
jest.mock("./user-menu.module.scss", () => ({
	menuButton: "menuButton",
	logo: "logo",
}));

describe("UserMenu", () => {
	const username = "testuser";
	const avatar = "avatar.png";

	it("renders the menu button", () => {
		render(<UserMenu username={username} avatar={avatar} />);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("does not show dropdown by default", () => {
		render(<UserMenu username={username} avatar={avatar} />);
		expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
	});

	it("shows dropdown when button is clicked", () => {
		render(<UserMenu username={username} avatar={avatar} />);
		fireEvent.click(screen.getByRole("button"));
		expect(screen.getByTestId("dropdown")).toBeInTheDocument();
		expect(screen.getByText(username)).toBeInTheDocument();
		expect(screen.getByAltText("avatar")).toHaveAttribute("src", avatar);
	});

	it("closes dropdown when clicking outside", () => {
		render(<UserMenu username={username} avatar={avatar} />);
		fireEvent.click(screen.getByRole("button"));
		expect(screen.getByTestId("dropdown")).toBeInTheDocument();

		// Simulate document click
		fireEvent.click(document);
		expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
	});

	it("toggles dropdown open/close on button click", () => {
		render(<UserMenu username={username} avatar={avatar} />);
		const button = screen.getByRole("button");
		fireEvent.click(button);
		expect(screen.getByTestId("dropdown")).toBeInTheDocument();
		fireEvent.click(button);
		expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
	});
});
