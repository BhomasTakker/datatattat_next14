import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";
import {
	CronType,
	FetchFunction,
	TimeFunction,
	SourceVariant,
} from "@/types/cms/Cron";

export const CRON_JOB_ITEM_CONFIG: InputListProps = {
	id: "cron-item",
	type: EditInputs.inputList,
	label: "Cron Job Item",
	createObject: false,
	inputs: [
		{
			id: "timeFunction",
			type: EditInputs.select,
			label: "Time Function",
			options: Object.values(TimeFunction),
		},
		{
			// depends on timeFunction selected
			// how many digits and what they mean
			id: "timeParams",
			type: EditInputs.array,
			title: "Time Parameters",
			createObject: false,
			input: {
				id: "param",
				type: EditInputs.number,
				label: "Parameter",
			},
		},
		{
			id: "fetchFunction",
			type: EditInputs.select,
			label: "Fetch Function",
			options: Object.values(FetchFunction),
		},
		{
			id: "titles",
			type: EditInputs.array,
			title: "Titles (RSS Only)",
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
			label: "Variant (RSS Only)",
			options: Object.values(SourceVariant),
		},
		{
			id: "fetchFunctionData",
			type: EditInputs.text,
			label: "Fetch Function Data (API Only)",
			required: false,
		},
	],
};

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
			type: EditInputs.select,
			label: "Type",
			options: Object.values(CronType),
		},
		{
			id: "cron",
			type: EditInputs.array,
			title: "Cron Jobs",
			createObject: true,
			input: CRON_JOB_ITEM_CONFIG,
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
