import { EditInputs } from "@/components/edit/inputs/inputs";
import { FetchFunction } from "@/types/cms/Cron";
import { InputListProps } from "@/types/edit/inputs/inputs";
import { CRON_FUNCTION } from "../timer/timer-options";

const apiOptions = [
	FetchFunction.PageQueries,
	FetchFunction.PingRoutes,
	FetchFunction.RadioScripts,
];

const API_CRON_JOB_ITEM_CONFIG: InputListProps = {
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
			options: apiOptions,
		},
		{
			id: "fetchFunctionData",
			type: EditInputs.text,
			label: "Fetch Function Data",
			required: false,
		},
	],
};

export const API_CRON_JOB_CONFIG: InputListProps = {
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
			input: API_CRON_JOB_ITEM_CONFIG,
		},
	],
};
