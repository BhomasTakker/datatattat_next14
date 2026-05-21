import React from "react";
import { render, screen } from "@testing-library/react";
import {
	renderArticle,
	renderGroup,
	renderMethod,
	renderTemplate,
	getGroups,
	DateRangeCutoff,
	LabelFormat,
	SortOrder,
} from "./timeline-day";
import { UNKNOWN_DATE_LABEL } from "./utils";
import { InteractionsOptions } from "../../article/interaction/interactions-map";
import type { ArticleRenderProps } from "../types";

jest.mock("./template", () => ({
	TimelineDayTemplate: () => <div data-testid="timeline-day-template" />,
}));
jest.mock("./timeline-day.module.scss", () => ({}));;
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

const makeArticleWithDate = (
	id: string,
	published: string,
): ArticleRenderProps => ({
	...makeArticle(id),
	details: { published },
});

const JAN_01 = "2020-01-01T10:00:00";
const JAN_01_NOON = "2020-01-01T11:00:00";
const JAN_01_LATE = "2020-01-01T12:00:00";
const JAN_02 = "2020-01-02T10:00:00";
const JAN_03 = "2020-01-03T10:00:00";
const JAN_15 = "2020-01-15T10:00:00";

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

describe("getGroups", () => {
	describe("default behaviour", () => {
		it("returns one group per distinct date", () => {
			const articles = [
				makeArticleWithDate("1", JAN_01),
				makeArticleWithDate("2", JAN_02),
			];
			expect(getGroups(articles, {})).toHaveLength(2);
		});

		it("returns an empty array when given no articles", () => {
			expect(getGroups([], {})).toEqual([]);
		});
	});

	describe("dateRangeCutoff", () => {
		it("includes all articles when using DateRangeCutoff.all", () => {
			const articles = [
				makeArticleWithDate("1", JAN_01),
				makeArticleWithDate("2", JAN_02),
			];
			expect(
				getGroups(articles, { dateRangeCutoff: DateRangeCutoff.all }),
			).toHaveLength(2);
		});

		it("excludes articles outside the date range", () => {
			const articles = [
				makeArticleWithDate("1", JAN_01),
				makeArticleWithDate("2", JAN_02),
			];
			expect(
				getGroups(articles, { dateRangeCutoff: DateRangeCutoff.last24h }),
			).toHaveLength(0);
		});
	});

	describe("showUnknownDates", () => {
		it("includes the unknown-date group by default", () => {
			const articles = [makeArticle("1")];
			const result = getGroups(articles, {});
			expect(result).toHaveLength(1);
			expect(result[0].label).toBe(UNKNOWN_DATE_LABEL);
		});

		it("excludes the unknown-date group when showUnknownDates is false", () => {
			const articles = [makeArticle("1"), makeArticleWithDate("2", JAN_01)];
			const result = getGroups(articles, { showUnknownDates: false });
			expect(result.every((g) => g.label !== UNKNOWN_DATE_LABEL)).toBe(true);
		});

		it("does not affect named date groups when showUnknownDates is false", () => {
			const articles = [
				makeArticleWithDate("1", JAN_01),
				makeArticleWithDate("2", JAN_02),
			];
			expect(getGroups(articles, { showUnknownDates: false })).toHaveLength(2);
		});
	});

	describe("maxGroups", () => {
		it("returns at most N groups when maxGroups is set", () => {
			const articles = [
				makeArticleWithDate("1", JAN_01),
				makeArticleWithDate("2", JAN_02),
				makeArticleWithDate("3", JAN_03),
			];
			expect(getGroups(articles, { maxGroups: 2 })).toHaveLength(2);
		});

		it("retains the most recent groups when maxGroups is set", () => {
			const articles = [
				makeArticleWithDate("1", JAN_01),
				makeArticleWithDate("2", JAN_02),
				makeArticleWithDate("3", JAN_03),
			];
			const result = getGroups(articles, { maxGroups: 2 });
			const ids = result.flatMap((g) => g.articles.map((a) => a._id));
			expect(ids).toContain("2");
			expect(ids).toContain("3");
			expect(ids).not.toContain("1");
		});
	});

	describe("maxArticlesPerGroup", () => {
		it("caps articles per group when maxArticlesPerGroup is set", () => {
			const articles = [
				makeArticleWithDate("1", JAN_01),
				makeArticleWithDate("2", JAN_01_NOON),
				makeArticleWithDate("3", JAN_01_LATE),
			];
			const result = getGroups(articles, { maxArticlesPerGroup: 2 });
			expect(result[0].articles).toHaveLength(2);
		});

		it("does not cap groups with fewer articles than the limit", () => {
			const articles = [
				makeArticleWithDate("1", JAN_01),
				makeArticleWithDate("2", JAN_02),
			];
			const result = getGroups(articles, { maxArticlesPerGroup: 5 });
			result.forEach((g) => expect(g.articles).toHaveLength(1));
		});
	});

	describe("sortOrder", () => {
		it("returns groups newest-first by default", () => {
			const articles = [
				makeArticleWithDate("1", JAN_01),
				makeArticleWithDate("2", JAN_02),
			];
			const result = getGroups(articles, {});
			expect(result[0].articles[0]._id).toBe("2");
			expect(result[1].articles[0]._id).toBe("1");
		});

		it("returns groups oldest-first when SortOrder.oldest", () => {
			const articles = [
				makeArticleWithDate("1", JAN_01),
				makeArticleWithDate("2", JAN_02),
			];
			const result = getGroups(articles, { sortOrder: SortOrder.oldest });
			expect(result[0].articles[0]._id).toBe("1");
			expect(result[1].articles[0]._id).toBe("2");
		});
	});

	describe("labelFormat", () => {
		it("uses short format labels by default", () => {
			const articles = [makeArticleWithDate("1", JAN_15)];
			const result = getGroups(articles, {});
			expect(result[0].label).not.toMatch(/\d{4}/);
		});

		it("uses long format labels when LabelFormat.long", () => {
			const articles = [makeArticleWithDate("1", JAN_15)];
			const result = getGroups(articles, { labelFormat: LabelFormat.long });
			expect(result[0].label).toMatch(/2020/);
		});
	});
});

describe("renderMethod", () => {
	it("renders a root div", () => {
		const { container } = render(<>{renderMethod([], {})}</>);
		expect(container.firstChild).not.toBeNull();
	});

	it("renders an empty root div when no articles are provided", () => {
		const { container } = render(<>{renderMethod([], {})}</>);
		expect(container.querySelector("section")).toBeNull();
	});

	it("renders one section per date group", () => {
		const articles = [
			makeArticleWithDate("1", JAN_01),
			makeArticleWithDate("2", JAN_02),
		];
		render(<>{renderMethod(articles, {})}</>);
		expect(document.querySelectorAll("section")).toHaveLength(2);
	});

	it("options are wired through — maxGroups caps the number of sections", () => {
		const articles = [
			makeArticleWithDate("1", JAN_01),
			makeArticleWithDate("2", JAN_02),
			makeArticleWithDate("3", JAN_03),
		];
		render(<>{renderMethod(articles, { maxGroups: 1 })}</>);
		expect(document.querySelectorAll("section")).toHaveLength(1);
	});
});

describe("renderTemplate", () => {
	it("renders the timeline day template", () => {
		render(<>{renderTemplate()}</>);
		expect(screen.getByTestId("timeline-day-template")).toBeInTheDocument();
	});
});
