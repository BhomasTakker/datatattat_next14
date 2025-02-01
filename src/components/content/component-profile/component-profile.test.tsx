import { render, screen } from "@testing-library/react";
import { ComponentProfile } from "./component-profile";
import { ComponentProfileProps } from "@/types/component";

// Mock the Link component
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

describe("ComponentProfile", () => {
	const defaultProps: ComponentProfileProps = {
		componentTitle: "Test Title",
		showComponentTitle: true,
		componentTitleLink: "/test-link",
	};

	it("renders the component title when showComponentTitle is true", () => {
		render(<ComponentProfile profile={defaultProps} />);
		const testTitle = screen.getByText("Test Title");
		expect(testTitle).toBeInTheDocument();
	});

	// it("does not render the component title when showComponentTitle is false", () => {
	// 	render(
	// 		<ComponentProfile
	// 			profile={{ ...defaultProps, showComponentTitle: false }}
	// 		/>
	// 	);
	// 	const testTitle = screen.queryByText("Test Title");
	// 	expect(testTitle).not.toBeInTheDocument();
	// });

	it("renders the component title as a link when componentTitleLink is provided", () => {
		render(<ComponentProfile profile={defaultProps} />);
		const linkElement = screen.getByRole("link", { name: "Test Title" });
		expect(linkElement).toHaveAttribute("href", "/test-link");
	});

	it("renders the component title as plain text when componentTitleLink is not provided", () => {
		render(
			<ComponentProfile
				// @ts-expect-error - Testing the component without componentTitleLink
				profile={{ ...defaultProps, componentTitleLink: undefined }}
			/>
		);
		const titleElement = screen.getByText("Test Title");
		expect(titleElement).toBeInTheDocument();
		const linkElement = screen.queryByRole("link", { name: "Test Title" });
		expect(linkElement).not.toBeInTheDocument();
	});
});
