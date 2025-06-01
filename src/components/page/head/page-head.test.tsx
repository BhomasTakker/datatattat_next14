import React from "react";
import { render } from "@testing-library/react";
import { PageHead } from "./page-head";
import Head from "next/head";
import { renderFavIcons } from "./fav-icon/fav-icon";
import { renderMeta } from "./meta/render-meta";

// Mock next/head to render its children directly
jest.mock("next/head", () => {
	return ({ children }: { children: React.ReactNode }) => <>{children}</>;
});

// Mock renderFavIcons and renderMeta
jest.mock("./fav-icon/fav-icon", () => ({
	renderFavIcons: jest.fn(() => <link data-testid="favicons" />),
}));
jest.mock("./meta/render-meta", () => ({
	renderMeta: jest.fn(({ data }) => (
		<meta data-testid="meta" data-content={JSON.stringify(data)} />
	)),
}));

describe("PageHead", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	// We aren't rendering the Head component directly, so we can't test it like this
	// We wpuld need to create a function to render meta tags
	// then test that function I suppose?
	it.skip("renders default title when no pageTitle is provided", () => {
		const { getByText } = render(<PageHead headData={{}} />);
		expect(getByText("Datatattat")).toBeInTheDocument();
	});

	it.skip("renders provided pageTitle", () => {
		const { getByText } = render(
			<PageHead headData={{ pageTitle: "Custom Title" }} />
		);
		expect(getByText("Custom Title")).toBeInTheDocument();
	});

	it.skip("renders description meta tag when description is provided", () => {
		const { getByRole } = render(
			<PageHead headData={{ description: "Test description" }} />
		);
		const meta = getByRole("meta", { hidden: true });
		expect(meta).toHaveAttribute("name", "description");
		expect(meta).toHaveAttribute("content", "Test description");
	});

	it("does not render description meta tag when description is not provided", () => {
		const { queryByRole } = render(<PageHead headData={{}} />);
		expect(queryByRole("meta", { hidden: true })).not.toBeInTheDocument();
	});

	it("calls renderFavIcons with favIcons", () => {
		const favIcons = [
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon",
				sizes: "16x16",
			},
		];
		render(<PageHead headData={{ favIcons }} />);
		expect(renderFavIcons).toHaveBeenCalledWith({ icons: favIcons });
	});

	it("calls renderMeta for openGraph and twitterCard", () => {
		const openGraph = { ogTitle: "OG Title" };
		const twitterCard = { twitterTitle: "Twitter Title" };
		render(<PageHead headData={{ openGraph, twitterCard }} />);
		expect(renderMeta).toHaveBeenCalledWith({ data: openGraph });
		expect(renderMeta).toHaveBeenCalledWith({ data: twitterCard });
	});

	it("renders nothing for openGraph and twitterCard if not provided", () => {
		render(<PageHead headData={{}} />);
		// openGraph and twitterCard default to empty object, so renderMeta is called twice
		expect(renderMeta).toHaveBeenCalledTimes(2);
		expect(renderMeta).toHaveBeenCalledWith({ data: {} });
	});
});
