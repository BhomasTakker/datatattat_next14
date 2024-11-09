import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PageStack, PageStackContent } from "./page-stack";

const MOCK: PageStackContent = {
	container: {
		containerType: "Stack",
		initData: {},
	},
	props: {
		direction: "column",
	},
	components: [],
};

const MOCK_COMPONENT = {
	componentType: "ListItem",
	componentProps: {},
	_with: {},
};

describe("Page Stack Test Suite", () => {
	it("should render an unordered list", () => {
		render(<PageStack content={MOCK} />);
		const component = screen.getByRole("list");
		expect(component).toBeInTheDocument();
	});

	it("should render an unordered list with expected class", () => {
		render(<PageStack content={MOCK} />);
		const component = screen.getByRole("list");
		expect(component).toHaveClass("root", "root-column");
	});

	it("should render a list item", () => {
		MOCK.components = [MOCK_COMPONENT];
		render(<PageStack content={MOCK} />);
		const component = screen.getByRole("listitem");
		expect(component).toBeInTheDocument();
	});

	it("should render expected number of list items", () => {
		MOCK.components = [MOCK_COMPONENT, MOCK_COMPONENT, MOCK_COMPONENT];
		render(<PageStack content={MOCK} />);
		const components = screen.getAllByRole("listitem");
		expect(components).toHaveLength(3);
	});

	it("renders PageStack unchanged", () => {
		MOCK.components = [MOCK_COMPONENT];
		const { container } = render(<PageStack content={MOCK} />);
		expect(container).toMatchSnapshot();
	});
});
