import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PageProfile } from "./page-profile";

describe("PageProfile Component", () => {
	it("should render without crashing", () => {
		const { container } = render(<PageProfile profile={{}} />);
		expect(container).toBeInTheDocument();
	});

	it("should not render the title if showPageTitle is false", () => {
		render(
			<PageProfile
				profile={{ pageTitle: "Test Title", showPageTitle: false }}
			/>
		);
		expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
	});

	it("should not render the title if pageTitle is not provided", () => {
		render(<PageProfile profile={{ showPageTitle: true }} />);
		expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
	});

	it("should render the title if showPageTitle is true and pageTitle is provided", () => {
		render(
			<PageProfile profile={{ pageTitle: "Test Title", showPageTitle: true }} />
		);
		expect(screen.getByText("Test Title")).toBeInTheDocument();
	});

	it("should apply the correct styles", () => {
		render(
			<PageProfile profile={{ pageTitle: "Test Title", showPageTitle: true }} />
		);

		// Should not resort to using test ids....
		expect(screen.getByTestId("page-profile-root")).toHaveClass("root");
		expect(screen.getByRole("heading")).toHaveClass("title");
	});

	it("renders page profile unchanged", () => {
		const { container } = render(
			<PageProfile profile={{ pageTitle: "Test Title", showPageTitle: true }} />
		);
		expect(container).toMatchSnapshot();
	});
});
