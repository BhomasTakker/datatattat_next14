import { EditInputs } from "@/components/edit/inputs/inputs";
import { TRANSFORM_CONFIG } from "./transform/transform-config";
import { FILTER_CONFIG } from "./filter/filter-config";
import { SORT_CONFIG } from "./sort/sort-config";
import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";

enum ConversionOptions {
	TRANSFORM = "TRANSFORM",
	FILTER = "FILTER",
	SORT = "SORT",
}

type conversionsProps =
	| typeof TRANSFORM_CONFIG
	| typeof FILTER_CONFIG
	| typeof SORT_CONFIG;

const conversionsMap = new Map<string, conversionsProps>([
	[ConversionOptions.TRANSFORM, TRANSFORM_CONFIG],
	[ConversionOptions.FILTER, FILTER_CONFIG],
	[ConversionOptions.SORT, SORT_CONFIG],
]);

const SUB_RESPONSE_INPUTS: GenericInput[] = [
	{
		id: "itemsTitle",
		type: EditInputs.title,
		title: "Item Data Object",
	},
	{
		id: "items",
		type: EditInputs.inputList,
		label: "Response Object",
		createObject: true,
		// When we createObject we should probably be able to specify the id to add to?
		// if it would/should vary from id?
		inputs: [
			{
				id: "responseKey",
				type: EditInputs.text,
				label: "Response key",
				defaultValue: "items",
				disabled: true,
			},
			{
				id: "iterable",
				type: EditInputs.switch,
				label: "Iterable",
				defaultChecked: true,
				disabled: true,
			},
			{
				// show controls etc?
				id: "default",
				type: EditInputs.array,
				label: "Default Sub Conversions",
				title: "Default Sub Response Conversions",
				createObject: true,
				disabled: true,

				defaultValue: [
					{
						type: "TRANSFORM",
						id: "toCollectionItem",
					},
				],

				input: {
					id: "default",
					type: EditInputs.inputList,
					label: "Response Object",
					createObject: false,
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
							defaultValue: "toCollectionItem",
							disabled: true,
						},
					],
				},
			},
			{
				// show controls etc?
				id: "conversions",
				type: EditInputs.array,
				label: "Add URLs",
				title: "Sub Conversions",
				createObject: true,
				// need to add disabled: true
				// and defaultValue to the input?
				// We need to allow an object 'shape'
				// This just saves an array and not an array of objects
				input: {
					id: "response",
					type: EditInputs.inputList,
					label: "Sub Object",
					createObject: false,
					// When we createObject we should probably be able to specify the id to add to?
					// if it would/should vary from id?
					inputs: [
						{
							id: "assignType",
							type: EditInputs.assignId,
							assignId: "type",
							useParent: true,

							input: {
								id: "type",
								type: EditInputs.objectSelect,
								label: "Conversion Type",
								required: true,
								defaultValue: ConversionOptions.TRANSFORM,
								options: [
									ConversionOptions.TRANSFORM,
									ConversionOptions.FILTER,
									ConversionOptions.SORT,
								],
								optionMap: conversionsMap,
							},
							// optionId: "componentProps",
						},
					],
				},
			},
		],
	},
];

export const SUB_RESPONSE_INPUT: InputListProps = {
	id: "sub",
	type: EditInputs.inputList,
	label: "RSS QUERY PARAMS",
	// better name etc required here

	createObject: true,

	inputs: SUB_RESPONSE_INPUTS,
};
