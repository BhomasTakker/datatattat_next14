import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { ContentOembed, OEmbedComponentProps } from "./content-oembed";

// Mock the ClientOembed component
jest.mock("./client-component", () => ({
	ClientOembed: ({ html }: { html: string }) => (
		<div
			data-testid="client-oembed"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	),
}));

// Mock styles
jest.mock("./content-oembed.module.scss", () => ({
	root: "mock-root-class",
}));

const baseOembed: OEmbedComponentProps = {
	// @ts-expect-error data structure is incomplete for testing
	oembed: {
		html: "<blockquote>Embedded Content</blockquote>",
		// add other OEmbed fields as needed
	},
};

const getComponentProps = (data: Partial<OEmbedComponentProps> = {}) => ({
	component: {},
	dataObject: { data: { ...baseOembed, ...data } },
});

describe("ContentOembed", () => {
	afterEach(() => {
		cleanup();
		jest.clearAllMocks();
	});

	it("renders the oEmbed html via ClientOembed", () => {
		// @ts-expect-error mock data
		render(<ContentOembed {...getComponentProps()} />);
		const wrapper = screen.getByTestId("content-oembed");
		expect(wrapper).toBeInTheDocument();
		expect(screen.getByTestId("client-oembed").innerHTML).toContain(
			"Embedded Content"
		);
	});

	it("does not render ClientOembed if html is missing", () => {
		const oembed = { ...baseOembed.oembed, html: undefined as any };
		// @ts-expect-error mock data incomplete
		render(<ContentOembed {...getComponentProps({ oembed })} />);
		expect(
			screen
				.getByTestId("content-oembed")
				.querySelector("[data-testid='client-oembed']")
		).toBeNull();
	});

	it("adds and removes script tag when script prop is provided", () => {
		const scriptUrl = "https://example.com/embed.js";
		const removeChildSpy = jest.spyOn(document.body, "removeChild");
		// @ts-expect-error mock data incomplete
		render(<ContentOembed {...getComponentProps({ script: scriptUrl })} />);
		const script = Array.from(
			document.body.getElementsByTagName("script")
		).find((el) => el.src === scriptUrl);
		expect(script).toBeDefined();
		cleanup();
		expect(removeChildSpy).toHaveBeenCalled();
		removeChildSpy.mockRestore();
	});

	it("does not add script tag when script prop is not provided", () => {
		// @ts-expect-error mock data incomplete
		render(<ContentOembed {...getComponentProps()} />);
		const scripts = Array.from(document.body.getElementsByTagName("script"));
		expect(scripts.some((el) => el.src === "")).toBe(false);
	});

	it("applies the root class from styles", () => {
		// @ts-expect-error mock data incomplete
		render(<ContentOembed {...getComponentProps()} />);
		const wrapper = screen.getByTestId("content-oembed");
		expect(wrapper.className).toContain("mock-root-class");
	});
});
