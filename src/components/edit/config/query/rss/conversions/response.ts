import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";

const RESPONSE_INPUTS: GenericInput[] = [
	{
		id: "responseTitle",
		type: EditInputs.title,
		title: "Response Data Object",
	},
	{
		id: "iterable",
		type: EditInputs.switch,
		label: "Iterable",
		defaultChecked: false,
		disabled: true,
	},
	{
		// show controls etc?
		id: "default",
		type: EditInputs.array,
		label: "Default Conversions",
		title: "Default Response Conversions",
		createObject: false,
		disabled: true,

		defaultValue: [
			{
				type: "TRANSFORM",
				id: "toCollection",
			},
		],

		input: {
			id: "default",
			type: EditInputs.inputList,
			label: "Response Object",
			createObject: true,
			inputs: [
				{
					id: "type",
					type: EditInputs.text,
					label: "Conversion Type",
					defaultValue: "TRANSFORM",
					disabled: true,
				},
				{
					id: "id",
					type: EditInputs.text,
					label: "Conversion ID",
					defaultValue: "toCollection",
					disabled: true,
				},
			],
		},
	},
	{
		// show controls etc?
		id: "conversions",
		type: EditInputs.array,
		label: "Add Conversion",
		title: "Response Conversions",
		createObject: false,
		// need to add disabled: true
		// and defaultValue to the input?
		// We need to allow an object 'shape'
		// This just saves an array and not an array of objects
		input: {
			id: "response",
			type: EditInputs.inputList,
			label: "Response Object",
			createObject: true,
			// When we createObject we should probably be able to specify the id to add to?
			// if it would/should vary from id?
			inputs: [
				{
					id: "type",
					type: EditInputs.select,
					label: "Conversion Type",
					defaultValue: "TRANSFORM",
					options: ["TRANSFORM"],
				},
				{
					id: "id",
					type: EditInputs.select,
					label: "Conversion ID",
					defaultValue: "toCollection",
					options: ["toCollection"],
				},
			],
		},
	},
];

export const RESPONSE_INPUT: InputListProps = {
	id: "response",
	type: EditInputs.inputList,
	label: "Response Object",
	createObject: true,
	// When we createObject we should probably be able to specify the id to add to?
	// if it would/should vary from id?
	inputs: RESPONSE_INPUTS,
};
