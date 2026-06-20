import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const SEARCH_ARTICLES_CONFIG: InputListProps = {
	id: "articles",
	type: EditInputs.inputList,
	label: "Search Articles",
	createObject: false,

	inputs: [
		{
			id: "searchArticlesTitle",
			type: EditInputs.title,
			title: "Search Articles",
		},
		{
			id: "q",
			type: EditInputs.text,
			label: "Search Query",
			required: false,
		},
	],
};
