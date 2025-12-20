import { EditInputs } from "@/components/edit/inputs/inputs";
import { TimeFunction } from "@/types/cms/Cron";
import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";

// technically these values are all different
// We would like a setArray type input for these
// something like param1: {input} param2: {input} param3: {input}
// and all are just saved in and as part of an array
// an ordered array if you will
export const STAGGER_MINUTES_CONFIG: InputListProps = {
	id: "timeParams",
	type: EditInputs.inputList,
	label: "Cron Job Item",
	createObject: true,
	inputs: [
		{
			id: "title",
			type: EditInputs.title,
			title: "Stagger Minutes Parameters",
		},
		{
			id: "description",
			type: EditInputs.description,
			text: "{n1, n2, n3} Every n1 Minute, On n2 Minute, At n3 Seconds",
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
	],
};

export const STAGGER_SECONDS_CONFIG: InputListProps = {
	id: "timeParams",
	type: EditInputs.inputList,
	label: "Cron Job Item",
	createObject: true,
	inputs: [
		{
			id: "title",
			type: EditInputs.title,
			title: "Stagger Seconds Parameters",
		},
		{
			id: "description",
			type: EditInputs.description,
			text: "{n1, n2} Every n1 Second, On n2 Second",
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
	],
};

export const EVERY_N_DAYS_CONFIG: InputListProps = {
	id: "timeParams",
	type: EditInputs.inputList,
	label: "Cron Job Item",
	createObject: true,
	inputs: [
		{
			id: "title",
			type: EditInputs.title,
			title: "Every N days Parameters",
		},
		{
			id: "description",
			type: EditInputs.description,
			text: "{n1, n2, n3, n4} Every n1 days, On n2 Hour, At n3 Minutes, At n4 Seconds",
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
	],
};

export const EVERY_NTH_HOUR_CONFIG: InputListProps = {
	id: "timeParams",
	type: EditInputs.inputList,
	label: "Cron Job Item",
	createObject: true,
	inputs: [
		{
			id: "title",
			type: EditInputs.title,
			title: "Every Nth Hour Parameters",
		},
		{
			id: "description",
			type: EditInputs.description,
			text: "{n1, n2, n3} Every n1 Hours, On n2 Minute, At n3 Seconds",
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
	],
};

// Map of TimeFunction options with their configurations
export const timeFunctionConfigMap = new Map([
	[TimeFunction.StaggerMinutes, STAGGER_MINUTES_CONFIG],
	[TimeFunction.StaggerSeconds, STAGGER_SECONDS_CONFIG],
	[TimeFunction.EveryNthHour, EVERY_NTH_HOUR_CONFIG],
	[TimeFunction.EveryNDays, EVERY_N_DAYS_CONFIG],
]);

export const CRON_FUNCTION: GenericInput[] = [
	{
		id: "timeFunction",
		type: EditInputs.objectSelect,
		label: "Time Function",
		options: Object.values(TimeFunction),
		optionMap: timeFunctionConfigMap,
		defaultValue: TimeFunction.StaggerMinutes,
	},
];
