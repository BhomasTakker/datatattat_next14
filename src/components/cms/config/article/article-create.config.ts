import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const ARTICLE_CREATE_CONFIG: InputListProps = {
	id: "createArticle",
	type: EditInputs.inputList,
	label: "Create Article",
	createObject: false,
	inputs: [
		{
			id: "ArticleCreateTitle",
			type: EditInputs.title,
			title: "Create New Article",
		},
		{
			id: "title",
			type: EditInputs.text,
			label: "Title",
			required: true,
			validation: {
				required: true,
			},
		},
		{
			id: "src",
			type: EditInputs.url,
			label: "Source URL",
			required: true,
			validation: {
				required: true,
			},
		},
		{
			id: "description",
			type: EditInputs.text,
			label: "Description",
			required: false,
		},
		{
			id: "guid",
			type: EditInputs.text,
			label: "GUID",
			required: false,
		},
		{
			id: "variant",
			type: EditInputs.select,
			label: "Variant",
			options: ["article", "audio", "video"],
			defaultValue: "article",
			required: true,
		},
		{
			id: "provider",
			type: EditInputs.text,
			label: "Provider ID",
			required: true,
			validation: {
				required: true,
			},
		},
		{
			id: "feed",
			type: EditInputs.text,
			label: "Source Feed ID",
			required: true,
			validation: {
				required: true,
			},
		},
	],
};
