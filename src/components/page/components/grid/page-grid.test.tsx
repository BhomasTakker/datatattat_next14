import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PageGrid, PageGridContent } from "./page-grid";
import {} from "../../../content/component-display";
import { PageComponent } from "@/types/page";

jest.mock("../../../content/component-display", () => {
	return {
		__esModule: true,
		ComponentDisplay: ({ component }: { component: PageComponent }) => {
			const { componentType, componentProps } = component;
			return (
				<section data-testid="page-grid-item">
					{`Component type:- ${componentType}`}
					{`Component props:- ${JSON.stringify(componentProps)}`}
				</section>
			);
		},
	};
});

// we need some proper mock data for tests
const MOCK: PageGridContent = {
	containerType: "Grid",
	props: {
		layout: "test-grid",
	},
	components: [],
};

const MOCK_COMPONENT = {
	componentType: "GridItem",
	componentProps: {},
	_with: {},
};

describe("Page Grid Test Suite", () => {
	it("should render a page grid element", () => {
		render(<PageGrid content={MOCK} />);
		const component = screen.getByTestId("page-component");
		expect(component).toBeInTheDocument();
	});

	it("should render an div with expected class", () => {
		render(<PageGrid content={MOCK} />);
		const component = screen.getByTestId("page-component");
		expect(component).toHaveClass("root", "root-test-grid");
	});

	it("should render a grid item", () => {
		// @ts-expect-error - mocking data
		MOCK.components = [MOCK_COMPONENT];
		render(<PageGrid content={MOCK} />);
		const component = screen.getByTestId("page-grid-item");
		expect(component).toBeInTheDocument();
	});

	it("should render expected number of list items", () => {
		// @ts-expect-error - mocking data
		MOCK.components = [MOCK_COMPONENT, MOCK_COMPONENT, MOCK_COMPONENT];
		render(<PageGrid content={MOCK} />);
		const components = screen.getAllByTestId("page-grid-item");
		expect(components).toHaveLength(3);
	});

	it("renders PageGrid unchanged", () => {
		// @ts-expect-error - mocking data
		MOCK.components = [MOCK_COMPONENT];
		const { container } = render(<PageGrid content={MOCK} />);
		expect(container).toMatchSnapshot();
	});
});
