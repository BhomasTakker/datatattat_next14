import { EditInputs } from "@/components/edit/inputs/inputs";
import { FetchFunction, SourceVariant } from "@/types/cms/Cron";
import { InputListProps } from "@/types/edit/inputs/inputs";
import { CRON_FUNCTION } from "../timer/timer-options";

const rssOptions = [
	FetchFunction.RSS,
	FetchFunction.YoutubeRSS,
	FetchFunction.Podcasts,
];

const RSS_CRON_JOB_ITEM_CONFIG: InputListProps = {
	id: "cron-item",
	type: EditInputs.inputList,
	label: "Cron Job Item",
	createObject: false,
	inputs: [
		...CRON_FUNCTION,
		{
			// options determined by type selected in parent object
			id: "fetchFunction",
			type: EditInputs.select,
			label: "Fetch Function",
			options: rssOptions,
		},
		// We potentially could split this up depending on fetchFunction - but all are the same for now
		// these options determined by the original slection of type in parent object
		{
			id: "titles",
			type: EditInputs.array,
			title: "Titles",
			createObject: false,
			input: {
				id: "title",
				type: EditInputs.text,
				label: "Title",
			},
		},
		{
			id: "variant",
			type: EditInputs.select,
			label: "Variant",
			options: Object.values(SourceVariant),
		},
	],
};

export const RSS_CRON_JOB_CONFIG: InputListProps = {
	id: "cron-item",
	type: EditInputs.inputList,
	label: "Cron Job Item",
	createObject: false,
	inputs: [
		{
			id: "cron",
			type: EditInputs.array,
			title: "Cron Jobs",
			createObject: true,
			input: RSS_CRON_JOB_ITEM_CONFIG,
		},
	],
};
