import React from "react";
import { render, screen } from "@testing-library/react";
import { UserProfile } from "./user-profile";
import type { User } from "@/types/auth/session";

const mockUser: User = {
	name: "John Doe",
	email: "john@example.com",
	image: "https://example.com/avatar.jpg",
	user_id: "12345",
};

describe("UserProfile", () => {
	it("renders the user's name", () => {
		render(<UserProfile user={mockUser} />);
		expect(screen.getByText("John Doe")).toBeInTheDocument();
	});

	it("renders the user's email", () => {
		render(<UserProfile user={mockUser} />);
		expect(screen.getByText("john@example.com")).toBeInTheDocument();
	});

	it("renders the user's image with correct src and alt", () => {
		render(<UserProfile user={mockUser} />);
		const img = screen.getByRole("img");
		expect(img).toHaveAttribute("src", mockUser.image);
		expect(img).toHaveAttribute("alt", "Me yar!");
	});

	it("renders the user's user_id", () => {
		render(<UserProfile user={mockUser} />);
		expect(
			screen.getByText(`user_id:- ${mockUser.user_id}`)
		).toBeInTheDocument();
	});

	it("applies the correct CSS classes", () => {
		render(<UserProfile user={mockUser} />);
		expect(screen.getByRole("img")).toHaveClass("image");
		expect(screen.getByText("John Doe")).toHaveClass("name");
		expect(screen.getByText("john@example.com")).toHaveClass("email");
		expect(screen.getByText(`user_id:- ${mockUser.user_id}`)).toHaveClass(
			"role"
		);
	});
});
