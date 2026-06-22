import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";

const beforeInput: GenericInput = {
	id: "before",
	type: EditInputs.date,
	label: "Filter Before ",
	required: false,
};

const afterInput: GenericInput = {
	id: "after",
	type: EditInputs.date,
	label: "Filter After ",
	required: false,
};

export const withinInput: GenericInput = {
	id: "within",
	type: EditInputs.select,
	label: "Within The Past",
	defaultValue: "none",
	options: [
		"1 hour",
		"2 hours",
		"3 hours",
		"6 hours",
		"12 hours",
		"1 day",
		"2 days",
		"3 days",
		"1 week",
		"2 weeks",
		"1 month",
		"3 months",
		"6 months",
		"1 year",
		"2 years",
	],
	required: false,
};

export const dateInputs: GenericInput[] = [
	beforeInput,
	afterInput,
	withinInput,
];
