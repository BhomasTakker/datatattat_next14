import React from "react";
import { render, screen } from "@testing-library/react";
import stackScroller from "./stack-scroller";
import { InteractionsOptions } from "../../article/interaction/interactions-map";
import { cloneDeep } from "../../../../../../utils/object";

// Mock dependencies
jest.mock("./stack-scroller.module.scss", () => ({}));
jest.mock("../../article/interaction/interactions", () => ({
	Interaction: ({ children, ...props }: any) => (
		<div data-testid="interaction" {...props}>
			{children}
		</div>
	),
}));
jest.mock("../../../../../../components/ui/in-view/in-view", () => ({
	InViewComponent: ({ children, ...props }: any) => (
		<div data-testid="inview" {...props}>
			{children}
		</div>
	),
}));
jest.mock("../../../../../../components/ui/with-data/with-data", () => ({
	WithData: ({ children, ...props }: any) => (
		<div data-testid="withdata" {...props}>
			{children}
		</div>
	),
}));
jest.mock("../utils", () => ({
	articleTemplate: () => "template",
	articleMetaLoader: (item: any) => () => ({ meta: "meta", ...item }),
	articleRenderer: () => (data: any) =>
		<div data-testid="article-renderer">{JSON.stringify(data)}</div>,
}));

describe("stackScroller", () => {
	const sampleArticles = [
		{ src: "article-1", title: "Article 1" },
		{ src: "article-2", title: "Article 2" },
	];

	it("should export styles and renderMethod", () => {
		expect(stackScroller).toHaveProperty("styles");
		expect(typeof stackScroller.renderMethod).toBe("function");
	});

	it("renderMethod returns an array of rendered articles", () => {
		// @ts-expect-error - mock data
		const rendered = stackScroller.renderMethod(sampleArticles, {});
		expect(Array.isArray(rendered)).toBe(true);
		expect(rendered).toHaveLength(sampleArticles.length);
	});

	it("each rendered article contains InViewComponent, Interaction, and WithData", () => {
		// @ts-expect-error - mock data
		const rendered = stackScroller.renderMethod(sampleArticles, {});
		const { container } = render(<>{rendered}</>);
		expect(screen.getAllByTestId("inview")).toHaveLength(sampleArticles.length);
		expect(screen.getAllByTestId("interaction")).toHaveLength(
			sampleArticles.length
		);
		expect(screen.getAllByTestId("withdata")).toHaveLength(
			sampleArticles.length
		);
	});

	it("Interaction receives correct props", () => {
		// @ts-expect-error - mock data
		const rendered = stackScroller.renderMethod([sampleArticles[0]], {});
		render(<>{rendered}</>);
		const interaction = screen.getByTestId("interaction");
		expect(interaction).toHaveAttribute("type", InteractionsOptions.Navigate);
		expect(interaction).toHaveAttribute("href", sampleArticles[0].src);
	});

	it("returns empty array when no articles are provided", () => {
		const rendered = stackScroller.renderMethod(undefined, {});
		expect(rendered).toEqual([]);
	});
});
