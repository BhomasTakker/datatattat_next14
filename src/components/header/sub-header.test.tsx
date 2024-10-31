import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { SubHeaders } from "./sub-headers";

type Props = { items: { label: string; route: string }[]; key: number };

jest.mock("./navigation/navigation-menu", () => {
	return {
		NavigationMenu: ({ items }: Props) => {
			return (
				<div>
					<ul>
						{items.map((item) => (
							<li key={item.label}>
								<p>{item.label}</p>
								<p>{item.route}</p>
							</li>
						))}
					</ul>
				</div>
			);
		},
	};
});

const mock = (id: string | number) => ({
	route: `/test-route-${id}`,
	nav: [
		{
			label: "Home",
			route: "/",
		},
		{
			label: "About",
			route: "/about",
		},
	],
});

describe("Sub Headers Test Suite", () => {
	it("renders a header", () => {
		render(SubHeaders({ headersArray: [mock("mock")] }));
		const home = screen.getByText("Home");
		expect(home).toBeInTheDocument();
	});

	it("renders 2 sub headers", () => {
		render(SubHeaders({ headersArray: [mock("mock1"), mock("mock2")] }));
		const homes = screen.getAllByText("Home");
		expect(homes.length).toEqual(2);
	});

	it("renders no more than 2 sub headers", () => {
		render(
			SubHeaders({
				headersArray: [
					mock("mock1"),
					mock("mock2"),
					mock("mock3"),
					mock("mock4"),
				],
			})
		);
		const homes = screen.getAllByText("Home");
		expect(homes.length).toEqual(2);
	});

	it("does not render if given headers array is empty", () => {
		const { container } = render(<SubHeaders headersArray={[]} />);
		expect(container).toBeEmptyDOMElement();
	});

	// How do we tst the order of the sub headers?

	it("renders SubHeaders unchanged", async () => {
		const { container } = render(
			<SubHeaders headersArray={[mock("mock1"), mock("mock2")]} />
		);
		expect(container).toMatchSnapshot();
	});
});
