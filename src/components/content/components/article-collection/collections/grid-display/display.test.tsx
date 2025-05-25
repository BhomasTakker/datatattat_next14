import React from "react";
import { render } from "@testing-library/react";
import { gridDisplay5, gridDisplay7 } from "./display";
import { InteractionsOptions } from "../../article/interaction/interactions-map";

jest.mock("../../article/article", () => ({
	Article: ({ article }: any) => (
		<div data-testid="article">{article.title}</div>
	),
}));
jest.mock("../../article/interaction/interactions", () => ({
	Interaction: ({ children, type, href }: any) => (
		<a data-testid="interaction" data-type={type} href={href}>
			{children}
		</a>
	),
}));

const mockArticles = Array.from({ length: 10 }).map((_, i) => ({
	src: `/article-${i}`,
	title: `Article ${i}`,
}));

describe("gridDisplay5", () => {
	it("should use the correct styles", () => {
		expect(gridDisplay5.styles).toBeDefined();
	});

	it("should render up to 5 articles", () => {
		// @ts-expect-error - mock data
		const elements = gridDisplay5.renderMethod(mockArticles, {});
		expect(elements).toHaveLength(5);
	});

	it("should render Interaction and Article components for each article", () => {
		// @ts-expect-error - mock data
		const elements = gridDisplay5.renderMethod(mockArticles, {});
		const { getAllByTestId } = render(<>{elements}</>);
		expect(getAllByTestId("interaction")).toHaveLength(5);
		expect(getAllByTestId("article")).toHaveLength(5);
	});

	it("should pass correct props to Interaction", () => {
		// @ts-expect-error - mock data
		const elements = gridDisplay5.renderMethod(mockArticles, {});
		const { getAllByTestId } = render(<>{elements}</>);
		getAllByTestId("interaction").forEach((el, idx) => {
			expect(el).toHaveAttribute("href", `/article-${idx}`);
			expect(el).toHaveAttribute("data-type", InteractionsOptions.Navigate);
		});
	});
});

describe("gridDisplay7", () => {
	it("should use the correct styles", () => {
		expect(gridDisplay7.styles).toBeDefined();
	});

	it("should render up to 7 articles", () => {
		// @ts-expect-error - mock data
		const elements = gridDisplay7.renderMethod(mockArticles, {});
		expect(elements).toHaveLength(7);
	});

	it("should render Interaction and Article components for each article", () => {
		// @ts-expect-error - mock data
		const elements = gridDisplay7.renderMethod(mockArticles, {});
		const { getAllByTestId } = render(<>{elements}</>);
		expect(getAllByTestId("interaction")).toHaveLength(7);
		expect(getAllByTestId("article")).toHaveLength(7);
	});
});

describe("renderMethod", () => {
	it("should handle empty articles array", () => {
		const elements = gridDisplay5.renderMethod([], {});
		expect(elements).toHaveLength(0);
	});

	it("should handle undefined articles", () => {
		const elements = gridDisplay5.renderMethod(undefined, {});
		expect(elements).toHaveLength(0);
	});
});
