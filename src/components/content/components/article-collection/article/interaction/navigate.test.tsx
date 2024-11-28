import React from "react";
import { render, screen } from "@testing-library/react";
import { Navigate, NavigateProps } from "./navigate";

jest.mock("next/link", () => {
	const MockLink = ({
		children,
		href,
	}: {
		children: React.ReactNode;
		href: string;
	}) => <a href={href}>{children}</a>;
	MockLink.displayName = "Link";
	return MockLink;
});

describe("Navigate Component", () => {
	const renderComponent = (props: NavigateProps) => {
		render(
			<Navigate href={props.href}>
				<span>Test Link</span>
			</Navigate>
		);
	};

	test("renders the link with correct href", () => {
		renderComponent({ href: "https://example.com" });
		const linkElement = screen.getByRole("link");
		expect(linkElement).toHaveAttribute("href", "https://example.com");
	});

	test("renders the children correctly", () => {
		renderComponent({ href: "https://example.com" });
		const linkElement = screen.getByText("Test Link");
		expect(linkElement).toBeInTheDocument();
	});

	test("renders with a valid URL", () => {
		renderComponent({ href: "https://example.com" });
		const linkElement = screen.getByRole("link");
		expect(linkElement).toHaveAttribute(
			"href",
			expect.stringMatching(/^https?:\/\//)
		);
	});
});
