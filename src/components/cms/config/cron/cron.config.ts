import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";
import { CronType, FetchFunction, SourceVariant } from "@/types/cms/Cron";
import { CRON_FUNCTION } from "./timer/timer-options";

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
			options: Object.values(FetchFunction),
		},
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
			options: Object.values(FetchFunction),
		},
		{
			id: "fetchFunctionData",
			type: EditInputs.text,
			label: "Fetch Function Data",
			required: false,
		},
	],
};

const API_CRON_JOB_CONFIG: InputListProps = {
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

const RSS_CRON_JOB_CONFIG: InputListProps = {
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

const cronTypeMap = new Map<string, InputListProps>([
	[CronType.API, API_CRON_JOB_CONFIG],
	[CronType.RSS, RSS_CRON_JOB_CONFIG],
]);

export const CRON_JOB_CONFIG: InputListProps = {
	id: "cron-job",
	type: EditInputs.inputList,
	label: "Cron Job Object",
	createObject: false,
	inputs: [
		{
			id: "id",
			type: EditInputs.text,
			label: "ID",
		},
		{
			id: "type",
			type: EditInputs.objectSelect,
			label: "Type",
			options: Object.values(CronType),
			optionMap: cronTypeMap,
			defaultValue: CronType.RSS,
		},
		{
			id: "isActive",
			type: EditInputs.switch,
			label: "Is Active",
		},
		{
			id: "createdAt",
			type: EditInputs.date,
			label: "Created",
			disabled: true,
		},
		{
			id: "updatedAt",
			type: EditInputs.date,
			label: "Last Updated",
			disabled: true,
		},
	],
};
