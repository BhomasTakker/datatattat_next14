import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const PAGINATION_FORM_CONFIG: InputListProps = {
	id: "pagination",
	type: EditInputs.inputList,
	label: "Pagination Object",
	createObject: false,
	inputs: [
		{
			id: "PaginationPropertiesTitle",
			type: EditInputs.title,
			title: "Pagination",
		},
	],
};
