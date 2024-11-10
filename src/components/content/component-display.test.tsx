import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ComponentDisplay } from "./component-display";
import {} from "./component-factory";
import { PageComponent } from "@/types/page";

jest.mock("./component-profile/component-profile", () => {
	return {
		__esModule: true,
		ComponentProfile: () => {
			return <div data-testid="component-profile">Componet Profile</div>;
		},
	};
});

jest.mock("./component-factory", () => {
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
		componentProps: {},
		_with: {},
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
