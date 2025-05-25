import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";

describe("RootLayout", () => {
	it("renders children correctly", async () => {
		render(await RootLayout({ children: <span>Test Child</span> }));
		expect(screen.getByText("Test Child")).toBeInTheDocument();
	});

	// Snaps won't work because we are rendering html and body within
	// I assume a jest html and body tag already exists in the test environment.
	// describe("Snaps", () => {
	// 	it("renders Layout Unchanged", async () => {
	// 		const { container } = render(
	// 			await RootLayout({ children: <span>Test Child</span> })
	// 		);
	// 		expect(container).toMatchSnapshot();
	// 	});
	// });
});
