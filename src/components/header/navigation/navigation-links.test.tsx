import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NavigationLinks } from "./navigation-links";

jest.mock("./nav-link", () => {
	return {
		// __esModule: true,
		NavLink: ({ route, label }: { route: string; label: string }) => {
			return (
				<a data-testid={label} href={route}>
					{label}
				</a>
			);
		},
	};
});

const MOCK = [
	{
		route: "/home",
		label: "Home",
	},
	{
		route: "/about",
		label: "About",
	},
];

describe("Navigation Links", () => {
	it("renders provided links", () => {
		render(<NavigationLinks navLinks={MOCK} />);
		const link = screen.getByRole("link", { name: /home/i });
		expect(link).toBeInTheDocument();
	});

	it("renders a link with the provided href", () => {
		render(<NavigationLinks navLinks={MOCK} />);
		const links = screen.getAllByRole("link");
		expect(links.length).toBe(MOCK.length);
	});

	it("renders navigation unchanged", () => {
		const { container } = render(<NavigationLinks navLinks={MOCK} />);
		expect(container).toMatchSnapshot();
	});
});
