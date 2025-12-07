import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const FETCH_ARTICLES_CONFIG: InputListProps = {
	id: "articles",
	type: EditInputs.inputList,
	label: "Profile Object",
	// createObject: false,

	inputs: [
		{
			id: "profilePropertiesTitle",
			type: EditInputs.title,
			title: "Fetch Articles Settings",
		},
		{
			id: "title",
			type: EditInputs.text,
			label: "Get by Title",
			required: false,
		},
		{
			id: "source",
			type: EditInputs.text,
			label: "Get by Source",
			required: false,
		},
		{
			id: "id",
			type: EditInputs.text,
			label: "Get by ID",
			required: false,
		},
	],
};
