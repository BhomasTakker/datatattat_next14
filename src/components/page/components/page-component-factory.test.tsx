import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PageComponentFactory } from "./page-component-factory";
import { PageContent } from "@/types/page";
import { PageComponentsOptions } from "./page-component-factory-options";

jest.mock("./stack/page-stack", () => {
	return {
		__esModule: true,
		PageStack: ({ content }: { content: PageContent }) => {
			const { container } = content || {};
			const { containerType } = container;
			return (
				<div data-testid="test-page-stack-component">{`Page Component ${containerType}`}</div>
			);
		},
	};
});

jest.mock("./grid/page-grid", () => {
	return {
		__esModule: true,
		PageGrid: ({ content }: { content: PageContent }) => {
			const { container } = content || {};
			const { containerType } = container;
			return (
				<div data-testid="test-page-grid-component">{`Page Component ${containerType}`}</div>
			);
		},
	};
});

const content = {
	container: {
		containerType: PageComponentsOptions.STACK,
		initData: {},
	},
	props: {},
	components: [],
};

describe("PageComponentFactory", () => {
	it("should render the Page Stack component", () => {
		render(<PageComponentFactory content={content} />);
		const component = screen.getByTestId("test-page-stack-component");
		expect(component).toBeInTheDocument();
	});

	it("should render the Page Grid component", () => {
		content.container.containerType = PageComponentsOptions.GRID;
		render(<PageComponentFactory content={content} />);
		const component = screen.getByTestId("test-page-grid-component");
		expect(component).toBeInTheDocument();
	});

	it("should render a default component if the container type is not found", () => {
		// @ts-expect-error - We are testing the default component
		content.container.containerType = "Unknown";

		render(<PageComponentFactory content={content} />);
		const component = screen.getByText("Component not found");
		expect(component).toBeInTheDocument();
	});

	it("renders PageComponentFactory unchanged", () => {
		content.container.containerType = PageComponentsOptions.STACK;
		const { container } = render(<PageComponentFactory content={content} />);
		expect(container).toMatchSnapshot();
	});
});
