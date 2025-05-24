import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";

describe("RootLayout", () => {
	it("renders children correctly", async () => {
		render(await RootLayout({ children: <span>Test Child</span> }));
		expect(screen.getByText("Test Child")).toBeInTheDocument();
	});

	describe("Snaps", () => {
		it("renders Layout Unchanged", async () => {
			const { container } = render(
				await RootLayout({ children: <span>Test Child</span> })
			);
			expect(container).toMatchSnapshot();
		});
	});
});
