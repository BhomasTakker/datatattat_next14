import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Icons } from "./icons";

// We need the component to pull from db
// We need to mock etc
// Should at least dummy

describe("Icons", () => {
	it("renders an icon link", () => {
		render(<Icons />);
		const firstLink = screen.getAllByRole("link")[0];
		expect(firstLink).toHaveAttribute("href", "https://x.com/datatattat");
	});

	it("renders exected number of links", () => {
		render(<Icons />);
		const links = screen.getAllByRole("link");
		// hard coded - need update with mock data etc
		expect(links.length).toBe(16);
	});

	it("renders icons unchanged", () => {
		const { container } = render(<Icons />);
		expect(container).toMatchSnapshot();
	});
});
