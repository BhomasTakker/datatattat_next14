import { DateRangeCutoff } from "@/components/content/components/article-collection/collections/timeline-day/timeline-day";
import { getWithConfig } from "@/components/edit/config/query/_with-config";
import { APIOptions } from "@/components/edit/config/query/api/api-base-config";
import { ARTICLE_OPTIONS } from "@/components/edit/config/query/types";
import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const TIMELINE_DAY_CONFIG: InputListProps = {
	id: "timelineDay",
	type: EditInputs.inputList,
	label: "Timeline (Day)",
	inputs: [
		{
			id: "timelineDayTitle",
			type: EditInputs.title,
			title: "Timeline (Day)",
		},
		{
			id: "dateRangeCutoff",
			type: EditInputs.select,
			label: "Date range",
			defaultValue: DateRangeCutoff.all,
			required: true,
			options: [...Object.values(DateRangeCutoff)],
		},
		{
			id: "maxArticlesPerGroup",
			type: EditInputs.number,
			label: "Max articles per day (1–20)",
			min: 1,
			max: 20,
			step: 1,
			defaultValue: 10,
		},
		{
			id: "maxGroups",
			type: EditInputs.number,
			label: "Max days to show (1–30)",
			min: 1,
			max: 30,
			step: 1,
			defaultValue: 7,
		},
		{
			id: "showUnknownDates",
			type: EditInputs.switch,
			label: "Show articles with unknown date",
			defaultChecked: true,
		},
		getWithConfig({
			options: ARTICLE_OPTIONS,
			apiConfigOptions: {
				options: [APIOptions.ARTICLES_SEARCH_API, APIOptions.YOUTUBE_API],
				defaultSelection: APIOptions.ARTICLES_SEARCH_API,
			},
		}),
	],
};
