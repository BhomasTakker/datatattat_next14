import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { ComponentFactory } from "../components/component-factory";

import { ComponentsOptions } from "../components/component-map";
import { PageComponent } from "@/types/page";

// Would need to mock a couple of options to test the default component

const MOCK = {
	component: {
		componentType: ComponentsOptions.ArticleCollection,
	},
};

describe("ComponentFactory", () => {
	it("should render the Article Collection component", () => {
		render(<ComponentFactory component={MOCK.component as PageComponent} />);
		const component = screen.getByText("Article Collection");
		expect(component).toBeInTheDocument();
	});

	it("should render a default component if the component type is not found", () => {
		// @ts-expect-error - We are testing the default component
		MOCK.component.componentType = "Unknown";

		render(<ComponentFactory component={MOCK.component as PageComponent} />);
		const component = screen.getByText("Component not found");
		expect(component).toBeInTheDocument();
	});

	it("renders ComponentFactory unchanged", () => {
		const { container } = render(
			<ComponentFactory component={MOCK.component as PageComponent} />
		);
		expect(container).toMatchSnapshot();
	});
});
