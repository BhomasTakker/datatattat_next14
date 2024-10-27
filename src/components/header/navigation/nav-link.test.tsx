import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NavLink } from "./nav-link";

describe("Nav Link", () => {
	it("renders a link", () => {
		render(<NavLink route="/home" label="Home" />);
		const link = screen.getByRole("link", {
			name: /home/i,
		});
		expect(link).toBeInTheDocument();
	});
	it("renders a link with the provided href", () => {
		render(<NavLink route="/home" label="Home" />);
		const link = screen.getByRole("link", {
			name: /home/i,
		});
		expect(link).toHaveProperty("href", "http://localhost/home");
	});
	it("renders nav link unchanged", () => {
		const { container } = render(<NavLink route="/home" label="Home" />);
		expect(container).toMatchSnapshot();
	});
});
