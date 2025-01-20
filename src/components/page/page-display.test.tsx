import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { PageDisplay } from "./page-display";
import { PageContent, PageProfile } from "@/types/page";
import { PageComponentsOptions } from "./components/page-component-factory-options";

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
			children: Array<React.ReactElement<any>>;
		}) => {
			const pageTitle = headData.pageTitle;
			document.title = pageTitle;
			return <div data-testid="test-page-head">{children}</div>;
		},
	};
});

jest.mock("./profile/page-profile", () => {
	return {
		__esModule: true,
		PageProfile: ({ profile }: { profile: PageProfile }) => {
			return <div data-testid="test-page-profile">{profile.pageTitle}</div>;
		},
	};
});

jest.mock("./components/page-component-factory", () => {
	return {
		__esModule: true,
		PageComponentFactory: ({ content }: { content: PageContent }) => {
			const { containerType } = content || {};

			return (
				<div data-testid="test-page-component-factory">{containerType}</div>
			);
		},
	};
});

const MOCK = {
	meta: {
		pageTitle: "My Page Title",
	},
	style: {},
	profile: {
		pageTitle: "My Page Title",
		pageTitleVariant: "variant",
		showPageTitle: true,
	},
	route: "",
	creator: {},
	content: {
		containerType: PageComponentsOptions.STACK,
		props: {},
		components: [],
	},
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe("PageDisplay", () => {
	it("renders main elelment", () => {
		render(<PageDisplay page={MOCK} />);
		const main = screen.getByRole("main");
		expect(main).toBeInTheDocument();
	});

	it.skip("renders correct document title", () => {
		render(<PageDisplay page={MOCK} />);
		expect(document.title).toEqual("My Page Title");
	});

	it.skip("renders page head", () => {
		render(<PageDisplay page={MOCK} />);
		const pageHead = screen.getByTestId("test-page-head");
		expect(pageHead).toBeInTheDocument();
	});

	it("renders page profile", () => {
		render(<PageDisplay page={MOCK} />);
		const pageProfile = screen.getByTestId("test-page-profile");
		expect(pageProfile).toBeInTheDocument();
	});

	it("renders page component factory with content", () => {
		render(<PageDisplay page={MOCK} />);
		const pageComponentFactory = screen.getByTestId(
			"test-page-component-factory"
		);
		expect(pageComponentFactory).toBeInTheDocument();
	});

	it("renders PageDisplay unchanged", () => {
		const { container } = render(<PageDisplay page={MOCK} />);
		expect(container).toMatchSnapshot();
	});
});
