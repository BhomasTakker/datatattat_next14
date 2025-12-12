import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const PAGINATION_FORM_CONFIG: InputListProps = {
	id: "pagination",
	type: EditInputs.inputList,
	label: "Pagination Object",
	createObject: false,
	inputs: [
		{
			id: "limit",
			type: EditInputs.number,
			label: "limit",
			defaultValue: 10,
			min: 1,
			max: 100,
			step: 1,
		},
		{
			id: "page",
			type: EditInputs.number,
			label: "Page",
			defaultValue: 1,
			min: 1,
			step: 1,
		},
	],
};
