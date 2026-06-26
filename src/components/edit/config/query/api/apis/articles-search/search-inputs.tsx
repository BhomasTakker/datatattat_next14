import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";

export const containsInput: GenericInput = {
	id: "filterContain",
	type: EditInputs.text,
	label: "Contains",
	required: false,
};

export const mustContainInput: GenericInput = {
	// We were the wrong way round!
	id: "mustContain",
	type: EditInputs.text,
	label: "Must Contain",
	required: false,
};

export const mustNotContainInput: GenericInput = {
	id: "mustNotContain",
	type: EditInputs.text,
	label: "Must Not Contain",
	required: false,
};

export const shouldContainInput: GenericInput[] = [
	{
		id: "shouldContainGroup",
		type: EditInputs.group,
		inputs: [
			{
				id: "shouldContain",
				type: EditInputs.text,
				label: "Should Contain",
				required: false,
			},
			{
				id: "minimumShouldMatch",
				type: EditInputs.number,
				label: "Minimum Should Match",
				required: false,
				step: 1,
				min: 0,
				defaultValue: 0,
			},
		],
	},
	{
		id: "minimumShouldMatchDescription",
		type: EditInputs.description,
		text: "If you have added 'should' values, you can set a minimum number of values to match. If 0 is set, 1 value should be set.",
	},
];
