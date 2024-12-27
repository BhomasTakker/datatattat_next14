import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";

export const PARAMS: GenericInput[] = [
	{
		id: "parameters",
		type: EditInputs.title,
		title: "RSS Parameters",
	},
	{
		id: "testId",
		type: EditInputs.text,
		label: "TEST",
		defaultValue: "testing123",
		disabled: true,
	},
	{
		id: "urls",
		type: EditInputs.array,
		label: "Add URLs",
		title: "Select URLs",
		createObject: false,
		// We need to allow an object 'shape'
		// This just saves an array and not an array of objects
		input: {
			id: "url",
			type: EditInputs.text,
			label: "url",
		},
	},
];
