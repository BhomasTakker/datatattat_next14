import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Page", () => {
	it("renders a heading", () => {
		render(<Page />);

		const heading = screen.getByRole("heading", {
			level: 1,
			name: /homepage/i,
		});

		expect(heading).toBeInTheDocument();
	});

	it("renders the correct heading", () => {
		render(<Page />);

		const heading = screen.getByText(/homepage/i);

		expect(heading).toBeInTheDocument();
	});
});

describe("Page snaps", () => {
	it("renders homepage unchanged", () => {
		const { container } = render(<Page />);
		expect(container).toMatchSnapshot();
	});
});
