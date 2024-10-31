import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MainHeader } from "./main-header";

jest.mock("./navigation-header", () => {
	return {
		NavigationHeader: () => {
			return <h2>Navigation Header</h2>;
		},
	};
});

jest.mock("./client-header", () => {
	return {
		ClientHeader: () => {
			return <h2>Client Header</h2>;
		},
	};
});

describe("MainHeader", () => {
	it("renders a header component", () => {
		render(<MainHeader />);
		const header = screen.getByRole("banner");
		expect(header).toBeInTheDocument();
	});

	it("renders the NavigationHeader", () => {
		render(<MainHeader />);
		const mainHeader = screen.queryByText("Navigation Header");
		expect(mainHeader).toBeInTheDocument();
	});

	it("renders the ClientHeader", () => {
		render(<MainHeader />);
		const clientHeader = screen.queryByText("Client Header");
		expect(clientHeader).toBeInTheDocument();
	});
});

describe("MainHeader snaps", () => {
	it("renders MainHeader unchanged", () => {
		const { container } = render(<MainHeader />);
		expect(container).toMatchSnapshot();
	});
});
