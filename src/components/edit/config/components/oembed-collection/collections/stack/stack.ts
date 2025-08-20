import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const OEMBED_STACK_CONFIG: InputListProps = {
	id: "stack",
	type: EditInputs.inputList,
	label: "Stack",
	inputs: [
		{
			id: "oembedComponentTitle",
			type: EditInputs.title,
			title: "Oembed Stack Component",
		},
	],
};
