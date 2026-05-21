import { ArticleRenderProps } from "../types";
import { DateRangeCutoff, LabelFormat, SortOrder } from "./timeline-day.types";
import { toDateKey, toDateLabel } from "./date-utils";

export type DayGroup = {
	label: string;
	articles: ArticleRenderProps[];
};

export const UNKNOWN_DATE_LABEL = "Unknown date";

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

export const applySortOrder = (
	groups: DayGroup[],
	sortOrder: SortOrder,
): DayGroup[] => {
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
