import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const BLUESKY_THREAD: InputListProps = {
	id: "blueskyThreadVariant",
	type: EditInputs.inputList,
	label: "BlueSky Thread Parameters",

	inputs: [
		{
			id: "BlueSkyThreadParams",
			type: EditInputs.title,
			title: "BlueSky Thread Params",
		},
		{
			id: "uri",
			type: EditInputs.text,
			label: "URI",
			required: true,
		},
		{
			id: "depth",
			type: EditInputs.number,
			label: "Depth",
			min: 0,
			defaultValue: 10,
			max: 1000,
			required: false,
		},
		{
			id: "parentHeight",
			type: EditInputs.number,
			label: "Parent Height",
			min: 0,
			defaultValue: 10,
			max: 1000,
			required: false,
		},
	],
};
