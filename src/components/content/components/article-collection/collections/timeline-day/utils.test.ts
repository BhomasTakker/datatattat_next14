import { groupArticlesByDay } from "./utils";
import { ArticleRenderProps } from "../types";

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

	it('labels the current day as "Today"', () => {
		const articles = [makeArticle("1", `${todayKey()}T10:00:00`)];
		const result = groupArticlesByDay(articles);
		expect(result[0].label).toBe("Today");
	});

	it('labels the previous day as "Yesterday"', () => {
		const articles = [makeArticle("1", `${yesterdayKey()}T10:00:00`)];
		const result = groupArticlesByDay(articles);
		expect(result[0].label).toBe("Yesterday");
	});

	it("labels older dates with a short formatted string", () => {
		const articles = [makeArticle("1", "2020-06-15T12:00:00")];
		const result = groupArticlesByDay(articles);
		expect(result[0].label).not.toBe("Today");
		expect(result[0].label).not.toBe("Yesterday");
		expect(result[0].label.length).toBeGreaterThan(0);
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
});
