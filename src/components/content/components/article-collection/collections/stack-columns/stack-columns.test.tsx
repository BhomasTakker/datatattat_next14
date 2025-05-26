import React from "react";
import { render, screen } from "@testing-library/react";
import stackColumns from "./stack-columns";
import { InteractionsOptions } from "../../article/interaction/interactions-map";
import { ArticleRenderProps } from "../types";

// Mock dependencies
jest.mock("./stack-columns.module.scss", () => ({
	container: "mock-container-class",
}));
jest.mock("../../../../../../components/ui/in-view/in-view", () => ({
	InViewComponent: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="in-view">{children}</div>
	),
}));
jest.mock("../../article/interaction/interactions", () => ({
	Interaction: ({ children, type, href }: any) => (
		<a data-testid="interaction" data-type={type} href={href}>
			{children}
		</a>
	),
}));
jest.mock("../../../../../../components/ui/with-data/with-data", () => ({
	WithData: ({ template }: any) => (
		<div data-testid="with-data">{template && "with-data"}</div>
	),
}));
jest.mock("../utils", () => ({
	articleMetaLoader: jest.fn(() => jest.fn()),
	articleRenderer: jest.fn(() => jest.fn()),
	articleTemplate: jest.fn(() => "mock-template"),
}));

describe("stackColumns", () => {
	const mockArticles: ArticleRenderProps[] = [
		{ src: "/article-1" } as ArticleRenderProps,
		{ src: "/article-2" } as ArticleRenderProps,
	];

	it("should export styles and renderMethod", () => {
		expect(stackColumns).toHaveProperty("styles");
		expect(typeof stackColumns.renderMethod).toBe("function");
	});

	it("renderMethod renders a container div with correct class", () => {
		const { container } = render(
			stackColumns.renderMethod(mockArticles, {}) as React.ReactElement
		);
		expect(container.firstChild).toHaveClass("mock-container-class");
	});

	it("renderMethod renders an InViewComponent for each article", () => {
		render(stackColumns.renderMethod(mockArticles, {}) as React.ReactElement);
		const inViewComponents = screen.getAllByTestId("in-view");
		expect(inViewComponents).toHaveLength(mockArticles.length);
	});

	it("each article is wrapped in an Interaction with correct props", () => {
		render(stackColumns.renderMethod(mockArticles, {}) as React.ReactElement);
		const interactions = screen.getAllByTestId("interaction");
		expect(interactions).toHaveLength(mockArticles.length);
		interactions.forEach((interaction, idx) => {
			expect(interaction).toHaveAttribute("href", mockArticles[idx].src);
			expect(interaction).toHaveAttribute(
				"data-type",
				InteractionsOptions.Navigate
			);
		});
	});

	it("each article renders WithData and passes template", () => {
		render(stackColumns.renderMethod(mockArticles, {}) as React.ReactElement);
		const withData = screen.getAllByTestId("with-data");
		expect(withData).toHaveLength(mockArticles.length);
		withData.forEach((el) => {
			expect(el).toHaveTextContent("with-data");
		});
	});

	it("renderMethod renders nothing if articles is empty", () => {
		const { container } = render(
			stackColumns.renderMethod([], {}) as React.ReactElement
		);
		expect(container.querySelectorAll("[data-testid='in-view']")).toHaveLength(
			0
		);
	});
});
