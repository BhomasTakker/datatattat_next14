import { ArticleRenderProps } from "../types";

export type DayGroup = {
	label: string;
	articles: ArticleRenderProps[];
};

const toDateKey = (value: Date | string): string => {
	const date = new Date(value);
	// YYYY-MM-DD in local time — used only for grouping, not display
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

const toDateLabel = (key: string): string => {
	const todayKey = toDateKey(new Date());
	const yesterdayDate = new Date();
	yesterdayDate.setDate(yesterdayDate.getDate() - 1);
	const yesterdayKey = toDateKey(yesterdayDate);

	if (key === todayKey) return "Today";
	if (key === yesterdayKey) return "Yesterday";

	// "Mon 19 May" — consistent with the existing Time component style
	const date = new Date(key);
	return new Intl.DateTimeFormat("en-GB", {
		weekday: "short",
		day: "numeric",
		month: "short",
	}).format(date);
};

export const groupArticlesByDay = (
	articles: ArticleRenderProps[],
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
			label: toDateLabel(key),
			articles: groupArticles,
		}),
	);

	// Append unpublished articles at the end under their own group
	if (unpublished.length > 0) {
		groups.push({ label: "Unknown date", articles: unpublished });
	}

	return groups;
};
