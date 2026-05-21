import React from "react";
import { render, screen } from "@testing-library/react";
import { renderArticle, renderGroup } from "./timeline-day";
import { InteractionsOptions } from "../../article/interaction/interactions-map";
import type { ArticleRenderProps } from "../types";

jest.mock("./timeline-day.module.scss", () => ({}));
jest.mock("../../article/interaction/interactions", () => ({
	Interaction: ({ children, ...props }: any) => (
		<div data-testid="interaction" {...props}>
			{children}
		</div>
	),
}));
jest.mock("../../article/interaction/interactions-map", () => ({
	InteractionsOptions: { Navigate: "navigate" },
}));
jest.mock("../../../../../../components/ui/in-view/in-view", () => ({
	InViewComponent: ({ children, options, ...props }: any) => (
		<div
			data-testid="inview"
			data-threshold={options?.threshold}
			data-trigger-once={String(options?.triggerOnce)}
			{...props}
		>
			{children}
		</div>
	),
}));
jest.mock("../../../../../../components/ui/with-data/with-data", () => ({
	WithData: ({
		getter: _getter,
		callback: _callback,
		template: _template,
		...props
	}: any) => <div data-testid="withdata" {...props} />,
}));
jest.mock("../utils", () => ({
	articleTemplate: () => "template",
	articleMetaLoader: jest.fn(() => jest.fn()),
	articleRenderer: jest.fn(() => jest.fn()),
}));

const makeArticle = (
	id: string,
	src = `https://example.com/${id}`,
): ArticleRenderProps => ({
	_id: id,
	title: `Article ${id}`,
	src,
	guid: id,
	variant: "",
	details: {},
});

describe("renderArticle", () => {
	it("renders an InViewComponent", () => {
		render(<>{renderArticle(makeArticle("1"))}</>);
		expect(screen.getByTestId("inview")).toBeInTheDocument();
	});

	it("passes threshold: 0 and triggerOnce: true to InViewComponent", () => {
		render(<>{renderArticle(makeArticle("1"))}</>);
		const inview = screen.getByTestId("inview");
		expect(inview).toHaveAttribute("data-threshold", "0");
		expect(inview).toHaveAttribute("data-trigger-once", "true");
	});

	it("renders an Interaction inside InViewComponent", () => {
		render(<>{renderArticle(makeArticle("1"))}</>);
		const interaction = screen.getByTestId("interaction");
		expect(screen.getByTestId("inview")).toContainElement(interaction);
	});

	it("passes Navigate type and article src as href to Interaction", () => {
		render(
			<>{renderArticle(makeArticle("1", "https://example.com/article-1"))}</>,
		);
		const interaction = screen.getByTestId("interaction");
		expect(interaction).toHaveAttribute("type", InteractionsOptions.Navigate);
		expect(interaction).toHaveAttribute(
			"href",
			"https://example.com/article-1",
		);
	});

	it("renders nothing when src is missing", () => {
		const article = {
			...makeArticle("1"),
			src: undefined as unknown as string,
		};
		const { container } = render(<>{renderArticle(article)}</>);
		expect(container).toBeEmptyDOMElement();
	});

	it("renders a WithData inside Interaction", () => {
		render(<>{renderArticle(makeArticle("1"))}</>);
		const withdata = screen.getByTestId("withdata");
		expect(screen.getByTestId("interaction")).toContainElement(withdata);
	});
});

describe("renderGroup", () => {
	it("renders a <section> element", () => {
		render(<>{renderGroup({ label: "Today", articles: [] })}</>);
		expect(document.querySelector("section")).toBeInTheDocument();
	});

	it("renders the group label in an <h2>", () => {
		render(<>{renderGroup({ label: "Today", articles: [] })}</>);
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"Today",
		);
	});

	it("renders one article element per article in the group", () => {
		const articles = [makeArticle("1"), makeArticle("2"), makeArticle("3")];
		render(<>{renderGroup({ label: "Today", articles })}</>);
		expect(screen.getAllByTestId("inview")).toHaveLength(3);
	});

	it("skips articles with no src", () => {
		const articles = [
			makeArticle("1"),
			{ ...makeArticle("2"), src: undefined as unknown as string },
			makeArticle("3"),
		];
		render(<>{renderGroup({ label: "Today", articles })}</>);
		expect(screen.getAllByTestId("inview")).toHaveLength(2);
	});

	it("renders with an empty articles list without crashing", () => {
		const { container } = render(
			<>{renderGroup({ label: "Today", articles: [] })}</>,
		);
		expect(container.querySelectorAll("[data-testid='inview']")).toHaveLength(
			0,
		);
	});
});
