import { ArticleRenderProps } from "../types";
import { DateRangeCutoff, LabelFormat, SortOrder } from "./timeline-day.types";

export type DayGroup = {
	label: string;
	articles: ArticleRenderProps[];
};

export const UNKNOWN_DATE_LABEL = "Unknown date";

// These feel more like time utils
// Look at moving out of here

const toDateKey = (value: Date | string): string => {
	const date = new Date(value);
	// YYYY-MM-DD in local time — used only for grouping, not display
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

const toDateLabel = (key: string, format: LabelFormat): string => {
	const todayKey = toDateKey(new Date());
	const yesterdayDate = new Date();
	yesterdayDate.setDate(yesterdayDate.getDate() - 1);
	const yesterdayKey = toDateKey(yesterdayDate);

	if (key === todayKey) return "Today";
	if (key === yesterdayKey) return "Yesterday";

	const date = new Date(key);
	if (format === LabelFormat.long) {
		// "Wednesday, 19 May 2026"
		return new Intl.DateTimeFormat("en-GB", {
			weekday: "long",
			day: "numeric",
			month: "long",
			year: "numeric",
		}).format(date);
	}
	// "Mon 19 May" — consistent with the existing Time component style
	return new Intl.DateTimeFormat("en-GB", {
		weekday: "short",
		day: "numeric",
		month: "short",
	}).format(date);
};

export const groupArticlesByDay = (
	articles: ArticleRenderProps[],
	labelFormat: LabelFormat = LabelFormat.short,
): DayGroup[] => {
	const grouped = new Map<string, ArticleRenderProps[]>();
	const unpublished: ArticleRenderProps[] = [];

	// Sort all articles newest-first before grouping
	const sorted = [...articles].sort((a, b) => {
		const aDate = a.details?.published
			? new Date(a.details.published).getTime()
			: 0;
		const bDate = b.details?.published
			? new Date(b.details.published).getTime()
			: 0;
		return bDate - aDate;
	});

	for (const article of sorted) {
		const published = article.details?.published;
		if (!published) {
			unpublished.push(article);
			continue;
		}
		const key = toDateKey(published);
		if (!grouped.has(key)) {
			grouped.set(key, []);
		}
		grouped.get(key)!.push(article);
	}

	// Groups are already in newest-first order because articles were pre-sorted
	const groups: DayGroup[] = Array.from(grouped.entries()).map(
		([key, groupArticles]) => ({
			label: toDateLabel(key, labelFormat),
			articles: groupArticles,
		}),
	);

	// Append unpublished articles at the end under their own group
	if (unpublished.length > 0) {
		groups.push({ label: UNKNOWN_DATE_LABEL, articles: unpublished });
	}

	return groups;
};

export const applySortOrder = (groups: DayGroup[], sortOrder: SortOrder): DayGroup[] => {
	if (sortOrder !== SortOrder.oldest) return groups;
	const named = groups.filter((g) => g.label !== UNKNOWN_DATE_LABEL);
	const unknown = groups.filter((g) => g.label === UNKNOWN_DATE_LABEL);
	return [...named.slice().reverse(), ...unknown];
};

const cutoffMs: Record<DateRangeCutoff, number | null> = {
	[DateRangeCutoff.all]: null,
	[DateRangeCutoff.last24h]: 24 * 60 * 60 * 1000,
	[DateRangeCutoff.last7d]: 7 * 24 * 60 * 60 * 1000,
	[DateRangeCutoff.last30d]: 30 * 24 * 60 * 60 * 1000,
};

export const filterByDateRange = (
	articles: ArticleRenderProps[],
	cutoff: DateRangeCutoff,
): ArticleRenderProps[] => {
	const ms = cutoffMs[cutoff];
	if (ms === null) return articles;

	const threshold = Date.now() - ms;
	return articles.filter((article) => {
		const published = article.details?.published;
		if (!published) return false;
		return new Date(published).getTime() >= threshold;
	});
};
