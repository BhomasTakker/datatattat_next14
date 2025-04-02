import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "./page";
import { getPage } from "../../../actions/page/page-actions";

jest.mock("../../../components/page/page-display", () => {
	return {
		PageDisplay: () => {
			return <h2>Page Display</h2>;
		},
	};
});

jest.mock("../../../actions/page/page-actions", () => {
	return {
		getPage: jest.fn().mockResolvedValue({}),
	};
});

jest.mock("../../../lib/services/intialise-services", () => {
	return {
		initialiseServices: jest.fn().mockResolvedValue(Promise.resolve()),
	};
});

describe("Page", () => {
	it("renders PageDisplay Component", async () => {
		render(await Page({ params: Promise.resolve({ route: ["route1"] }) }));

		const pageDisplay = screen.getByRole("heading", {
			level: 2,
			name: /page display/i,
		});

		expect(pageDisplay).toBeInTheDocument();
	});

	it("renders error display when no page data received", async () => {
		(getPage as jest.Mock).mockResolvedValueOnce(null);
		render(await Page({ params: Promise.resolve({ route: ["route1"] }) }));

		const heading = screen.getByText(/404/i);

		expect(heading).toBeInTheDocument();
	});

	it("should call getPage with expeced route", async () => {
		render(await Page({ params: Promise.resolve({ route: ["route1"] }) }));
		expect(getPage as jest.Mock).toHaveBeenCalledWith("/route1");
	});
});

describe("Page snaps", () => {
	it("renders homepage unchanged", async () => {
		const { container } = render(
			await Page({ params: Promise.resolve({ route: ["route1"] }) })
		);
		expect(container).toMatchSnapshot();
	});
});
