import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PageStack, PageStackContent } from "./page-stack";
import { PageComponent } from "@/types/page";

jest.mock("../../../content/component-display", () => {
	return {
		__esModule: true,
		ComponentDisplay: ({ component }: { component: PageComponent }) => {
			const { componentType, componentProps } = component;
			return (
				<>
					{`Component type:- ${componentType}`}
					<section>{`Component props:- ${JSON.stringify(
						componentProps
					)}`}</section>
				</>
			);
		},
	};
});

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
	componentProps: {
		variant: "default",
		componentTitle: "Sample Title",
		componentTitleLink: "/sample-link",
		showComponentTitle: true,
	},
	_with: {
		type: "sampleType",
		query: {
			key: "sampleKey",
			value: "sampleValue",
			provider: "sampleProvider",
			params: {},
			conversions: [
				{
					response: "sampleResponse",
					sub: "sampleSub",
					conversionId: "sampleConversionId",
					additionalProp: "sampleAdditionalProp",
				},
			],
			queryId: "sampleQueryId",
		},
	},
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
		// @ts-expect-error whatever this is
		MOCK.components = [MOCK_COMPONENT];
		render(<PageStack content={MOCK} />);
		const component = screen.getByRole("listitem");
		expect(component).toBeInTheDocument();
	});

	it("should render expected number of list items", () => {
		// @ts-expect-error whatever this is
		MOCK.components = [MOCK_COMPONENT, MOCK_COMPONENT, MOCK_COMPONENT];
		render(<PageStack content={MOCK} />);
		const components = screen.getAllByRole("listitem");
		expect(components).toHaveLength(3);
	});

	it("renders PageStack unchanged", () => {
		// @ts-expect-error whatever this is
		MOCK.components = [MOCK_COMPONENT];
		const { container } = render(<PageStack content={MOCK} />);
		expect(container).toMatchSnapshot();
	});
});
