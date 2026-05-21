import { LabelFormat } from "./timeline-day.types";

export const toDateKey = (value: Date | string): string => {
	const date = new Date(value);
	// YYYY-MM-DD in local time — used only for grouping, not display
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

export const toDateLabel = (key: string, format: LabelFormat): string => {
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
