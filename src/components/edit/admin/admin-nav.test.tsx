import React from "react";
import { render, screen } from "@testing-library/react";
import { AdminNav } from "./admin-nav";
import "@testing-library/jest-dom";

// Mock next/link to render children directly
jest.mock("next/link", () => {
	return ({ href, children }: any) => <a href={href}>{children}</a>;
});

describe("AdminNav", () => {
	it("renders Edit link when isAdmin is true", () => {
		render(<AdminNav levels={["level1", "level2"]} isAdmin={true} />);
		const editLink = screen.getByRole("link", { name: /edit/i });
		expect(editLink).toBeInTheDocument();
		expect(editLink).toHaveAttribute("href", "/edit");
	});

	it("renders Admin link when isAdmin is false", () => {
		render(<AdminNav levels={["level1", "level2"]} isAdmin={false} />);
		const adminLink = screen.getByRole("link", { name: /admin/i });
		expect(adminLink).toBeInTheDocument();
		expect(adminLink).toHaveAttribute("href", "/admin");
	});

	it("renders nav element", () => {
		render(<AdminNav levels={[]} isAdmin={false} />);
		expect(screen.getByRole("navigation")).toBeInTheDocument();
	});

	it("does not render Edit link when isAdmin is false", () => {
		render(<AdminNav levels={[]} isAdmin={false} />);
		expect(screen.queryByText(/edit/i)).not.toBeInTheDocument();
	});

	it("does not render Admin link when isAdmin is true", () => {
		render(<AdminNav levels={[]} isAdmin={true} />);
		expect(screen.queryByText(/admin/i)).not.toBeInTheDocument();
	});
});
