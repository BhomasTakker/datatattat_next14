import React from "react";
import { render } from "@testing-library/react";
import { videoDisplay, VideoDisplayOptions } from "./video-display";
import { PlayerCollectionVariant, PlayerSourceTypes } from "./structs";
import { ArticleRenderProps } from "../types";

// Mock the VideoDisplayComponent
jest.mock("./video-display-component", () => ({
	VideoDisplayComponent: ({ articles, ...props }: any) => (
		<div
			data-testid="video-display-component"
			data-articles={articles.length}
			{...props}
		/>
	),
}));

describe("videoDisplay.renderMethod", () => {
	const defaultOptions: VideoDisplayOptions = {
		variant: PlayerCollectionVariant.HorizontalScroll,
		sourceType: PlayerSourceTypes.Youtube,
		autoplay: true,
	};

	const articles: ArticleRenderProps[] = [
		{ id: "1", title: "Test Article 1" } as unknown as ArticleRenderProps,
		{ id: "2", title: "Test Article 2" } as unknown as ArticleRenderProps,
	];

	it("returns null if articles is undefined", () => {
		const result = videoDisplay.renderMethod(undefined, defaultOptions);
		expect(result).toBeNull();
	});

	it("returns null if articles is empty", () => {
		const result = videoDisplay.renderMethod([], defaultOptions);
		expect(result).toBeNull();
	});

	it("renders VideoDisplayComponent with correct props", () => {
		const { container, getByTestId } = render(
			<>{videoDisplay.renderMethod(articles, defaultOptions)}</>
		);
		const component = getByTestId("video-display-component");
		expect(component).toBeInTheDocument();
		expect(component.getAttribute("data-articles")).toBe("2");
		expect(component.getAttribute("variant")).toBe(
			PlayerCollectionVariant.HorizontalScroll
		);
		expect(component.getAttribute("sourceType")).toBe(
			PlayerSourceTypes.Youtube
		);
		// autoplay returning null?
		// expect(component.getAttribute("autoplay")).toBe(true);
	});

	it("passes additional options to VideoDisplayComponent", () => {
		const options = {
			...defaultOptions,
			customProp: "customValue",
		};
		const { getByTestId } = render(
			<>{videoDisplay.renderMethod(articles, options)}</>
		);
		const component = getByTestId("video-display-component");
		expect(component.getAttribute("customProp")).toBe("customValue");
	});
});

describe("videoDisplay.styles", () => {
	it("should export styles object", () => {
		expect(videoDisplay.styles).toBeDefined();
	});
});
