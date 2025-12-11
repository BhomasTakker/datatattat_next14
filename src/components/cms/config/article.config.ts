import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const ARTICLE_CONFIG: InputListProps = {
	id: "article",
	type: EditInputs.inputList,
	label: "Article Object",
	createObject: false,
	inputs: [
		{
			id: "ArticlePropertiesTitle",
			type: EditInputs.title,
			title: "Article",
		},
		{
			id: "title",
			type: EditInputs.text,
			label: "Title",
			disabled: true,
		},
		{
			id: "description",
			type: EditInputs.text,
			label: "Description",
			disabled: true,
		},
		{
			id: "src",
			type: EditInputs.text,
			label: "Source",
			disabled: true,
		},
		{
			id: "variant",
			type: EditInputs.text,
			label: "Variant",
			disabled: true,
		},
		// we should show provider and it should be populated
		// details
		// media
		{
			id: "disabled",
			type: EditInputs.switch,
			label: "Disabled",
			defaultChecked: false,
		},
	],
};
