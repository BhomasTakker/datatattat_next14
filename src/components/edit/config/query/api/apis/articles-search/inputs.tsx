import { EditInputs } from "@/components/edit/inputs/inputs";
import {
	InputGroupProps,
	NumberInputProps,
	SelectInputProps,
	TextInputProps,
} from "@/types/edit/inputs/inputs";

export const coverageInput: SelectInputProps = {
	id: "coverage",
	type: EditInputs.select,
	options: ["international", "national", "regional", "local"],
	deselectLabel: "All",
	label: "Coverage",
	required: false,
};

export const providerInput: TextInputProps = {
	id: "provider",
	type: EditInputs.text,
	label: "Filter By Provider",
};

export const trustInputs: InputGroupProps = {
	id: "trustInputs",
	type: EditInputs.group,
	inputs: [
		{
			id: "trustHigher",
			type: EditInputs.number,
			label: "Trust Rating Higher Than",
			max: 100,
			min: 0,
			required: false,
		},
		{
			id: "trustLower",
			type: EditInputs.number,
			label: "Trust Rating Lower Than",
			max: 100,
			min: 0,
			required: false,
		},
	],
};

export const sortInput: SelectInputProps = {
	id: "sort",
	type: EditInputs.select,
	label: "Sort",
	defaultValue: "none",
	options: ["none", "relevance", "date-ascending", "date-descending"],
	required: true,
};

// min and max!
export const limitInput: NumberInputProps = {
	id: "limit",
	type: EditInputs.number,
	label: "Limit",
	required: false,
	min: 1,
	max: 100,
};
