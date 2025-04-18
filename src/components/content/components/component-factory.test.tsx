import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { ComponentFactory } from "../components/component-factory";

import { ComponentsOptions } from "../components/component-map";
import { PageComponent } from "@/types/page";
import { getCurrentRoute } from "../../../utils/route";

// Would need to mock a couple of options to test the default component

const MOCK = {
	component: {
		componentType: ComponentsOptions.ArticleCollection,
	},
};

jest.mock("../../../actions/data/get-data", () => {
	return {
		getData: jest.fn().mockResolvedValue({}),
	};
});

jest.mock("../../../utils/route", () => {
	return {
		getCurrentRoute: jest.fn().mockResolvedValue("/"),
	};
});

jest.mock("./article-collection/article-collection", () => {
	return {
		__esModule: true,
		ArticleCollection: () => {
			return <div data-testid="article-collection">Article Collection</div>;
		},
	};
});

describe("ComponentFactory", () => {
	it("should render the Article Collection component", async () => {
		render(
			await ComponentFactory({ component: MOCK.component as PageComponent })
		);
		const component = screen.getByText("Article Collection");
		expect(component).toBeInTheDocument();
	});

	it("should render a default component if the component type is not found", async () => {
		// @ts-expect-error - We are testing the default component
		MOCK.component.componentType = "Unknown";
		render(
			await ComponentFactory({ component: MOCK.component as PageComponent })
		);
		const component = screen.getByText(/Component not found/i);
		expect(component).toBeInTheDocument();
	});

	it("renders ComponentFactory unchanged", async () => {
		const { container } = render(
			await ComponentFactory({ component: MOCK.component as PageComponent })
		);
		expect(container).toMatchSnapshot();
	});
});
