import {
	groupArticlesByDay,
	filterByDateRange,
	applySortOrder,
	UNKNOWN_DATE_LABEL,
} from "./utils";
import type { DayGroup } from "./utils";
import { DateRangeCutoff, SortOrder } from "./timeline-day.types";
import type { ArticleRenderProps } from "../types";

const makeArticle = (
	id: string,
	published?: string | Date,
): ArticleRenderProps => ({
	_id: id,
	title: `Article ${id}`,
	src: `https://example.com/${id}`,
	guid: id,
	variant: "",
	details: published ? { published } : {},
});

// Pin "today" and "yesterday" relative to a fixed reference so tests don't
// drift. We override Date.now in the module indirectly via new Date() calls,
// but since groupArticlesByDay uses the real clock for labels we instead
// derive today/yesterday from the actual current date in the test.
const todayKey = () => {
	const d = new Date();
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${y}-${m}-${day}`;
};

const yesterdayKey = () => {
	const d = new Date();
	d.setDate(d.getDate() - 1);
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${y}-${m}-${day}`;
};

describe("groupArticlesByDay", () => {
	it("returns an empty array when given no articles", () => {
		expect(groupArticlesByDay([])).toEqual([]);
	});

	it("returns a single group when all articles share the same day", () => {
		const articles = [
			makeArticle("1", `${todayKey()}T10:00:00`),
			makeArticle("2", `${todayKey()}T14:00:00`),
			makeArticle("3", `${todayKey()}T08:00:00`),
		];
		const result = groupArticlesByDay(articles);
		expect(result).toHaveLength(1);
		expect(result[0].label).toBe("Today");
		expect(result[0].articles).toHaveLength(3);
	});

	it("returns multiple groups for articles across different days", () => {
		const articles = [
			makeArticle("1", `${todayKey()}T10:00:00`),
			makeArticle("2", `${yesterdayKey()}T09:00:00`),
			makeArticle("3", "2020-01-15T12:00:00"),
		];
		const result = groupArticlesByDay(articles);
		expect(result).toHaveLength(3);
	});

	it("orders groups newest-first", () => {
		const articles = [
			makeArticle("old", "2020-01-01T10:00:00"),
			makeArticle("today", `${todayKey()}T10:00:00`),
			makeArticle("yesterday", `${yesterdayKey()}T10:00:00`),
		];
		const result = groupArticlesByDay(articles);
		expect(result[0].label).toBe("Today");
		expect(result[1].label).toBe("Yesterday");
	});

	it("orders articles within a group newest-first", () => {
		const articles = [
			makeArticle("early", `${todayKey()}T08:00:00`),
			makeArticle("late", `${todayKey()}T20:00:00`),
			makeArticle("mid", `${todayKey()}T12:00:00`),
		];
		const result = groupArticlesByDay(articles);
		const ids = result[0].articles.map((a) => a._id);
		expect(ids).toEqual(["late", "mid", "early"]);
	});

	it('places articles with no published date into an "Unknown date" group at the end', () => {
		const articles = [
			makeArticle("1", `${todayKey()}T10:00:00`),
			makeArticle("no-date"),
		];
		const result = groupArticlesByDay(articles);
		const last = result[result.length - 1];
		expect(last.label).toBe("Unknown date");
		expect(last.articles[0]._id).toBe("no-date");
	});

	it("handles a mix of Date objects and date strings", () => {
		const articles = [
			makeArticle("str", `${todayKey()}T10:00:00`),
			makeArticle("obj", new Date(`${todayKey()}T14:00:00`)),
		];
		const result = groupArticlesByDay(articles);
		expect(result).toHaveLength(1);
		expect(result[0].articles).toHaveLength(2);
	});

	it("places all undated articles into a single Unknown date group", () => {
		const articles = [makeArticle("a"), makeArticle("b"), makeArticle("c")];
		const result = groupArticlesByDay(articles);
		expect(result).toHaveLength(1);
		expect(result[0].label).toBe(UNKNOWN_DATE_LABEL);
		expect(result[0].articles).toHaveLength(3);
	});
});

describe("applySortOrder", () => {
	const group = (label: string): DayGroup => ({ label, articles: [] });

	it("returns groups unchanged when sortOrder is newest", () => {
		const groups = [group("Today"), group("Yesterday"), group("Mon 12 May")];
		const result = applySortOrder(groups, SortOrder.newest);
		expect(result.map((g) => g.label)).toEqual([
			"Today",
			"Yesterday",
			"Mon 12 May",
		]);
	});

	it("reverses group order when sortOrder is oldest", () => {
		const groups = [group("Today"), group("Yesterday"), group("Mon 12 May")];
		const result = applySortOrder(groups, SortOrder.oldest);
		expect(result.map((g) => g.label)).toEqual([
			"Mon 12 May",
			"Yesterday",
			"Today",
		]);
	});

	it("keeps the Unknown date group at the end when sorting oldest-first", () => {
		const groups = [
			group("Today"),
			group("Yesterday"),
			group(UNKNOWN_DATE_LABEL),
		];
		const result = applySortOrder(groups, SortOrder.oldest);
		expect(result[result.length - 1].label).toBe(UNKNOWN_DATE_LABEL);
		expect(result[0].label).toBe("Yesterday");
		expect(result[1].label).toBe("Today");
	});

	it("returns an empty array unchanged", () => {
		expect(applySortOrder([], SortOrder.oldest)).toEqual([]);
	});

	it("does not modify the original array", () => {
		const groups = [group("Today"), group("Yesterday")];
		const original = [...groups];
		applySortOrder(groups, SortOrder.oldest);
		expect(groups.map((g) => g.label)).toEqual(original.map((g) => g.label));
	});
});

describe("filterByDateRange", () => {
	const hoursAgo = (h: number) =>
		new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
	const daysAgo = (d: number) =>
		new Date(Date.now() - d * 24 * 60 * 60 * 1000).toISOString();

	it("returns all articles when cutoff is 'all'", () => {
		const articles = [
			makeArticle("1", hoursAgo(1)),
			makeArticle("2", daysAgo(10)),
			makeArticle("3", daysAgo(60)),
		];
		expect(filterByDateRange(articles, DateRangeCutoff.all)).toHaveLength(3);
	});

	it("filters to last 24 hours", () => {
		const articles = [
			makeArticle("recent", hoursAgo(12)),
			makeArticle("old", daysAgo(2)),
		];
		const result = filterByDateRange(articles, DateRangeCutoff.last24h);
		expect(result).toHaveLength(1);
		expect(result[0]._id).toBe("recent");
	});

	it("filters to last 7 days", () => {
		const articles = [
			makeArticle("within", daysAgo(5)),
			makeArticle("outside", daysAgo(10)),
		];
		const result = filterByDateRange(articles, DateRangeCutoff.last7d);
		expect(result).toHaveLength(1);
		expect(result[0]._id).toBe("within");
	});

	it("filters to last 30 days", () => {
		const articles = [
			makeArticle("within", daysAgo(20)),
			makeArticle("outside", daysAgo(40)),
		];
		const result = filterByDateRange(articles, DateRangeCutoff.last30d);
		expect(result).toHaveLength(1);
		expect(result[0]._id).toBe("within");
	});

	it("excludes articles with no published date when a cutoff is active", () => {
		const articles = [
			makeArticle("recent", hoursAgo(1)),
			makeArticle("no-date"),
		];
		const result = filterByDateRange(articles, DateRangeCutoff.last24h);
		expect(result).toHaveLength(1);
		expect(result[0]._id).toBe("recent");
	});

	it("returns empty array when no articles fall within the range", () => {
		const articles = [makeArticle("old", daysAgo(60))];
		expect(filterByDateRange(articles, DateRangeCutoff.last7d)).toHaveLength(0);
	});
});
