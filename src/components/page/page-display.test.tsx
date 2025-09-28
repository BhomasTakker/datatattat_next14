import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { PageDisplay } from "./page-display";
import { PageContent, PageProfile } from "@/types/page";
import { PageComponentsOptions } from "./components/page-component-factory-options";

// Mock the getCurrentRoute utility
jest.mock("../../utils/route", () => ({
	getCurrentRoute: jest.fn().mockResolvedValue("/test-route"),
}));

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
		PageComponentFactory: ({
			content,
			isClient,
		}: {
			content: PageContent;
			isClient: boolean;
		}) => {
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
		pageDescription: "Test description",
		pageKeywords: "test, keywords",
		pageImage: "test-image.jpg",
		favIcons: [],
		showCardData: false,
		cardData: {
			title: "Test Title",
			description: "Test Description",
			image: "test.jpg",
			["image:alt"]: "Test Alt",
			locale: "en",
			site_name: "Test Site",
			url: "http://test.com",
		},
	},
	style: {},
	profile: {
		pageTitle: "My Page Title",
		pageTitleVariant: "variant",
		showPageTitle: true,
	},
	route: "",
	creator: {} as any,
	content: {
		containerType: PageComponentsOptions.STACK,
		props: {},
		components: [],
	},
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe("PageDisplay", () => {
	it("renders main element", async () => {
		render(await PageDisplay({ page: MOCK }));
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

	it("renders page profile", async () => {
		render(await PageDisplay({ page: MOCK }));
		const pageProfile = screen.getByTestId("test-page-profile");
		expect(pageProfile).toBeInTheDocument();
	});

	it("renders page component factory with content", async () => {
		render(await PageDisplay({ page: MOCK }));
		const pageComponentFactory = screen.getByTestId(
			"test-page-component-factory"
		);
		expect(pageComponentFactory).toBeInTheDocument();
	});

	it("renders PageDisplay unchanged", async () => {
		const { container } = render(await PageDisplay({ page: MOCK }));
		expect(container).toMatchSnapshot();
	});
});
