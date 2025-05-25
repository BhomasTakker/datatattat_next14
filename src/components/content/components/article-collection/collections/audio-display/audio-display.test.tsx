import React from "react";
import { render } from "@testing-library/react";
import { audioDisplay, AudioVerticalScrollerSize } from "./audio-display";
import { AudioDisplayComponent } from "./audio-display-component";
import { ArticleRenderProps } from "../types";

// Mock the AudioDisplayComponent to observe its props
jest.mock("./audio-display-component", () => ({
	AudioDisplayComponent: jest.fn(() => (
		<div data-testid="audio-display-component" />
	)),
}));

describe("audioDisplay.renderMethod", () => {
	const articles: ArticleRenderProps[] = [
		{ id: "1", title: "Test Article 1" } as unknown as ArticleRenderProps,
		{ id: "2", title: "Test Article 2" } as unknown as ArticleRenderProps,
	];

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("returns null if articles is undefined", () => {
		const result = audioDisplay.renderMethod(undefined, {});
		expect(result).toBeNull();
	});

	it("returns null if articles is empty", () => {
		const result = audioDisplay.renderMethod([], {});
		expect(result).toBeNull();
	});

	it("renders AudioDisplayComponent with articles and options", () => {
		const options = { size: AudioVerticalScrollerSize.large, custom: "value" };
		const { container, getByTestId } = render(
			audioDisplay.renderMethod(articles, options) as React.ReactElement
		);
		expect(getByTestId("audio-display-component")).toBeInTheDocument();
		expect(AudioDisplayComponent).toHaveBeenCalledWith(
			expect.objectContaining({
				articles,
				size: AudioVerticalScrollerSize.large,
				custom: "value",
			}),
			undefined
		);
	});

	it("renders AudioDisplayComponent with default options if none provided", () => {
		render(audioDisplay.renderMethod(articles, {}) as React.ReactElement);
		expect(AudioDisplayComponent).toHaveBeenCalledWith(
			expect.objectContaining({ articles }),
			undefined
		);
	});
});

describe("audioDisplay.styles", () => {
	it("should export styles object", () => {
		expect(audioDisplay.styles).toBeDefined();
	});
});

describe("AudioVerticalScrollerSize", () => {
	it("should have correct size values", () => {
		expect(AudioVerticalScrollerSize.large).toBe("large");
		expect(AudioVerticalScrollerSize.medium).toBe("medium");
		expect(AudioVerticalScrollerSize.small).toBe("small");
	});
});
