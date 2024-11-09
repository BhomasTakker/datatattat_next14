import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PageGrid, PageGridContent } from "./page-grid";
import {} from "../../../component/component-display";
import { PageComponent } from "@/types/page";

jest.mock("../../../component/component-display", () => {
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

const MOCK: PageGridContent = {
	container: {
		containerType: "Grid",
		initData: {},
	},
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
		const component = screen.getByTestId("page-grid");
		expect(component).toBeInTheDocument();
	});

	it("should render an div with expected class", () => {
		render(<PageGrid content={MOCK} />);
		const component = screen.getByTestId("page-grid");
		expect(component).toHaveClass("root", "root-test-grid");
	});

	it("should render a grid item", () => {
		MOCK.components = [MOCK_COMPONENT];
		render(<PageGrid content={MOCK} />);
		const component = screen.getByTestId("page-grid-item");
		expect(component).toBeInTheDocument();
	});

	it("should render expected number of list items", () => {
		MOCK.components = [MOCK_COMPONENT, MOCK_COMPONENT, MOCK_COMPONENT];
		render(<PageGrid content={MOCK} />);
		const components = screen.getAllByTestId("page-grid-item");
		expect(components).toHaveLength(3);
	});

	it("renders PageGrid unchanged", () => {
		MOCK.components = [MOCK_COMPONENT];
		const { container } = render(<PageGrid content={MOCK} />);
		expect(container).toMatchSnapshot();
	});
});
