import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { PageDisplay } from "./page-display";

type Meta = {
	pageTitle: string;
	description: string;
};

jest.mock("./head/page-head", () => {
	return {
		__esModule: true,
		PageHead: ({
			headData,
			children,
		}: {
			headData: Meta;
			children: Array<React.ReactElement>;
		}) => {
			const pageTitle = headData.pageTitle;
			document.title = pageTitle;
			return <>{children}</>;
		},
	};
});

const MOCK = {
	meta: {
		pageTitle: "My Page Title",
	},
	style: {},
	profile: {},
	route: "",
	creator: {},
	content: {
		container: { containerType: "containerType", initData: {} },
		props: {},
		components: [],
	},
	createdAt: new Date(),
	updatedAt: new Date(),
};
// We need to mock head, profile, and factory
// Test that the main element is rendered
// Test that head, profile, and factory mocks are rendered
describe("PageDisplay", () => {
	it("renders main elelment", async () => {
		render(<PageDisplay page={MOCK} />);
		const main = screen.getByRole("main");
		expect(main).toBeInTheDocument();
	});

	// Doesn't seem required.
	// Just renders PageHead component is the test
	it("renders correct document title", async () => {
		render(<PageDisplay page={MOCK} />);
		expect(document.title).toEqual("My Page Title");
	});
});
