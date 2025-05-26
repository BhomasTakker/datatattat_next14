import React from "react";
import { render, screen } from "@testing-library/react";
import { ComponentProfile } from "./component-profile";
import { ComponentProfileProps } from "@/types/component";
import "@testing-library/jest-dom";

// Mock next/link for testing
jest.mock("next/link", () => {
	return ({ children, href }: any) => <a href={href}>{children}</a>;
});

const baseProfile: ComponentProfileProps = {
	componentTitle: "Test Title",
	showComponentTitle: true,
	// @ts-expect-error mock data
	componentTitleLink: undefined,
};

describe("ComponentProfile", () => {
	it("renders the component title when provided", () => {
		render(<ComponentProfile profile={baseProfile} />);
		expect(screen.getByText("Test Title")).toBeInTheDocument();
	});

	it("renders the component title as a link when componentTitleLink is provided", () => {
		const profile: ComponentProfileProps = {
			...baseProfile,
			componentTitleLink: "/test-link",
		};
		render(<ComponentProfile profile={profile} />);
		const link = screen.getByRole("link", { name: "Test Title" });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/test-link");
	});

	it("does not render anything if componentTitle is undefined", () => {
		const profile: ComponentProfileProps = {
			...baseProfile,
			// @ts-expect-error mock data
			componentTitle: undefined,
		};
		const { container } = render(<ComponentProfile profile={profile} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("does not render anything if componentTitle is an empty string", () => {
		const profile: ComponentProfileProps = {
			...baseProfile,
			componentTitle: "",
		};
		const { container } = render(<ComponentProfile profile={profile} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("renders with custom class names from styles", () => {
		render(<ComponentProfile profile={baseProfile} />);
		const title = screen.getByText("Test Title");
		expect(title).toHaveClass("title");
	});

	it("renders the root div with the correct class", () => {
		render(<ComponentProfile profile={baseProfile} />);
		const rootDiv = screen.getByText("Test Title").closest("div");
		expect(rootDiv).toHaveClass("root");
	});

	describe("Snaps", () => {
		it("matches the snapshot with a title", () => {
			const { asFragment } = render(<ComponentProfile profile={baseProfile} />);
			expect(asFragment()).toMatchSnapshot();
		});

		it("matches the snapshot with a title link", () => {
			const profile: ComponentProfileProps = {
				...baseProfile,
				componentTitleLink: "/test-link",
			};
			const { asFragment } = render(<ComponentProfile profile={profile} />);
			expect(asFragment()).toMatchSnapshot();
		});

		it("matches the snapshot when componentTitle is undefined", () => {
			const profile: ComponentProfileProps = {
				...baseProfile,
				// @ts-expect-error mock data
				componentTitle: undefined,
			};
			const { asFragment } = render(<ComponentProfile profile={profile} />);
			expect(asFragment()).toMatchSnapshot();
		});

		it("matches the snapshot when componentTitle is an empty string", () => {
			const profile: ComponentProfileProps = {
				...baseProfile,
				componentTitle: "",
			};
			const { asFragment } = render(<ComponentProfile profile={profile} />);
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
