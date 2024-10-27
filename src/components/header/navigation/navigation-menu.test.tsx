import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NavigationMenu } from "./navigation-menu";

jest.mock("./navigation-links", () => {
	return {
		NavigationLinks: ({
			navLinks,
		}: {
			navLinks: { route: string; label: string }[];
		}) => {
			return (
				<div>
					{navLinks.map(({ label, route }) => (
						<a key={label} data-testid={label} href={route}>
							{label}
						</a>
					))}
				</div>
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

describe("Navigation Menu", () => {
	it("renders nav element when provided links", () => {
		render(<NavigationMenu items={MOCK} />);
		const nav = screen.getByTestId("nav");
		expect(nav).toBeInTheDocument();
	});

	it("renders provided links", () => {
		render(<NavigationMenu items={MOCK} />);
		const link = screen.getByRole("link", { name: /home/i });
		expect(link).toBeInTheDocument();
	});

	it("does not render a nav element when provided with an empty array", () => {
		render(<NavigationMenu items={[]} />);
		const nav = screen.queryByTestId("nav");
		expect(nav).not.toBeInTheDocument();
	});

	it("renders navigation unchanged", () => {
		const { container } = render(<NavigationMenu items={MOCK} />);
		expect(container).toMatchSnapshot();
	});
});
