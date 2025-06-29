import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";

const PARAMS: GenericInput[] = [
	{
		id: "q",
		type: EditInputs.text,
		label: "Text Search",
		required: false,
		// searches title / use - to exclude words 'to search a phrase'
	},
];

export const BLUESKY_API_CONFIG: InputListProps = {
	id: "blueSkyApi",
	type: EditInputs.inputList,
	label: "BlueSky Search API",

	inputs: [
		{
			id: "BlueSkyApiTitle",
			type: EditInputs.title,
			title: "BlueSky Search API",
		},
		// {
		//   id: "params",
		//   type: EditInputs.inputList,
		//   label: "API QUERY PARAMS",

		//   createObject: true,

		//   inputs: PARAMS,
		// },
	],
};
