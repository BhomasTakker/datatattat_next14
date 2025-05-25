import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MenuDropDown, DropDownProps } from "./menu-drop-down";
import { PATHS } from "@/lib/routing/paths";

// Mock next/navigation
jest.mock("next/navigation", () => ({
	usePathname: () => "/current-path",
}));

// Mock next/link
jest.mock("next/link", () => {
	return ({ href, children }: any) => <a href={href}>{children}</a>;
});

// Mock react-icons
jest.mock("react-icons/bi", () => ({
	BiSolidUser: () => <svg data-testid="user-icon" />,
}));

const defaultProps: DropDownProps = {
	isOpen: true,
	setIsOpen: jest.fn(),
	avatar: "avatar-url.jpg",
	username: "testuser",
};

describe("MenuDropDown", () => {
	it("renders with open class when isOpen is true", () => {
		render(<MenuDropDown {...defaultProps} />);
		const dropdown = screen.getByRole("list").parentElement;
		expect(dropdown?.className).toMatch(/open/);
	});

	it("renders profile item with avatar and username", () => {
		render(<MenuDropDown {...defaultProps} />);
		expect(screen.getByAltText("testuser profile picture")).toHaveAttribute(
			"src",
			"avatar-url.jpg"
		);
		expect(screen.getByText("testuser")).toBeInTheDocument();
	});

	it("renders all dropdown items with correct text and links", () => {
		render(<MenuDropDown {...defaultProps} />);
		expect(screen.getByText("Profile").closest("a")).toHaveAttribute(
			"href",
			PATHS.profile("testuser")
		);
		expect(screen.getByText("User Home").closest("a")).toHaveAttribute(
			"href",
			PATHS.user("testuser")
		);
		expect(screen.getByText("Edit").closest("a")).toHaveAttribute(
			"href",
			PATHS.edit()
		);
		expect(screen.getByText("Sign Out").closest("a")).toHaveAttribute(
			"href",
			PATHS.signOut("/current-path")
		);
	});

	it("renders the user icon in the Profile dropdown item", () => {
		render(<MenuDropDown {...defaultProps} />);
		expect(screen.getByTestId("user-icon")).toBeInTheDocument();
	});

	it("does not have open class when isOpen is false", () => {
		render(<MenuDropDown {...defaultProps} isOpen={false} />);
		const dropdown = screen.getByRole("list").parentElement;
		expect(dropdown?.className).not.toMatch(/open/);
	});
});
