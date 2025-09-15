import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../inputs/inputs";

const componentProfileOptions = (): GenericInput[] => [
	{
		id: "componentTitle",
		type: EditInputs.text,
		label: "Component Title",
		required: false,
	},
	{
		id: "componentTitleLink",
		type: EditInputs.text,
		label: "Component Title Link",
		required: false,
	},
];

/**
 * Add to componentProps object
 */
export const componentProfile: InputListProps = {
	id: "componentProps",
	type: EditInputs.inputList,
	label: "Component",
	createObject: true,
	inputs: componentProfileOptions(),
};
