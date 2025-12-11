import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const ARTICLE_MEDIA: InputListProps = {
	id: "articleVariant",
	type: EditInputs.inputList,
	label: "Article Configuration",
	createObject: false,
	inputs: [],
};
