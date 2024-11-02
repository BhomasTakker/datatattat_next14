import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MainFooter } from "./main-footer";

jest.mock("./icons", () => {
	return {
		Icons: () => <p>Icons</p>,
	};
});

describe("Main Footer", () => {
	it("renders footer", () => {
		render(<MainFooter />);
		const footer = screen.getByRole("contentinfo");
		expect(footer).toBeInTheDocument();
	});

	it("renders copyright notice", () => {
		render(<MainFooter />);
		const copyright = screen.getByText(
			/datatattat is not responsible for the content of external sites./i
		);
		expect(copyright).toBeInTheDocument();
	});

	it("renders current year", () => {
		render(<MainFooter />);
		const year = new Date(Date.now()).getFullYear();
		console.log({ year });
		// way 1 and 2
		// const message = screen.getByText(`${year}`, { exact: false });
		const message = screen.getByText(new RegExp(year.toString()));
		expect(message).toBeInTheDocument();
	});

	it("renders footer unchanged", () => {
		const { container } = render(<MainFooter />);
		expect(container).toMatchSnapshot();
	});
});
