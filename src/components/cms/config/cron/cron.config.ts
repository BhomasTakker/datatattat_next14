import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";
import { CronType } from "@/types/cms/Cron";
import { RSS_CRON_JOB_CONFIG } from "./rss";
import { API_CRON_JOB_CONFIG } from "./api";

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
