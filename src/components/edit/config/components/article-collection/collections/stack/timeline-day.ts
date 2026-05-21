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
		getWithConfig({
			options: ARTICLE_OPTIONS,
			apiConfigOptions: {
				options: [APIOptions.ARTICLES_SEARCH_API, APIOptions.YOUTUBE_API],
				defaultSelection: APIOptions.ARTICLES_SEARCH_API,
			},
		}),
	],
};
