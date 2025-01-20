import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ComponentDisplay } from "./component-display";
import {} from "./components/component-factory";
import { PageComponent } from "@/types/page";

jest.mock("./component-profile/component-profile", () => {
	return {
		__esModule: true,
		ComponentProfile: () => {
			return <div data-testid="component-profile">Componet Profile</div>;
		},
	};
});

// In reality this would be an async component
// How would you test this?
jest.mock("./components/component-factory", () => {
	return {
		__esModule: true,
		ComponentFactory: ({ component }: { component: PageComponent }) => {
			const { componentType } = component;
			return <div data-testid="component-factory">{componentType}</div>;
		},
	};
});

describe("Component Display Test Suite", () => {
	const MOCK: PageComponent = {
		componentType: "Component",
		// @ts-expect-error - typing is not correct
		componentProps: {
			variant: "default",
			componentTitle: "Sample Title",
			componentTitleLink: "http://example.com",
			showComponentTitle: true,
		},
		_with: {
			type: "",
			query: {
				provider: "",
				params: {},
				conversions: {
					response: {},
					sub: {},
					conversionId: "",
				},
				queryId: "",
			},
		},
	};

	it("should render a component", () => {
		render(<ComponentDisplay component={MOCK} />);
		const component = screen.getByTestId("component");
		expect(component).toBeInTheDocument();
	});

	it("should render a component profile", () => {
		render(<ComponentDisplay component={MOCK} />);
		const component = screen.getByTestId("component-profile");
		expect(component).toBeInTheDocument();
	});

	it("should render a component factory", () => {
		render(<ComponentDisplay component={MOCK} />);
		const component = screen.getByTestId("component-factory");
		expect(component).toBeInTheDocument();
	});

	it("renders ComponentDisplay unchanged", () => {
		const { container } = render(<ComponentDisplay component={MOCK} />);
		expect(container).toMatchSnapshot();
	});
});
