/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PageHead } from "./page-head";

jest.mock("next/head", () => {
	return {
		__esModule: true,
		default: ({ children }: { children: Array<React.ReactElement> }) => {
			return <>{children}</>;
		},
	};
});

const MOCK = {
	pageTitle: "My Page Title",
	description: "This is a description",
};

const MOCK2 = {
	pageTitle: "",
	description: "",
};

describe("PageHead", () => {
	it("should render given title", async () => {
		render(<PageHead headData={MOCK} />);
		const title = screen.getByText(MOCK.pageTitle);
		expect(title).toBeInTheDocument();
	});

	it("should render the title as datatattat if no title provided", async () => {
		render(<PageHead headData={MOCK2} />);
		const title = screen.getByText(/datatattat/i);
		expect(title).toBeInTheDocument();
	});

	it("should render a pseudo description if description data received", async () => {
		render(<PageHead headData={MOCK} />);

		// A wrk around to test the meta tag
		const { container } = render(<PageHead headData={MOCK} />);
		const descriptionEl = container.querySelector(`meta[name="description"]`);
		expect(descriptionEl).toBeInTheDocument();
	});

	it("should not render a description meta element if no descriptin received", async () => {
		render(<PageHead headData={MOCK} />);

		// A wrk around to test the meta tag
		const { container } = render(<PageHead headData={MOCK2} />);
		const descriptionEl = container.querySelector(`meta[name="description"]`);
		expect(descriptionEl).not.toBeInTheDocument();
	});
});
