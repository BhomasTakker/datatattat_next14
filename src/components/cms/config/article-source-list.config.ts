import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const ARTICLE_SOURCE_LIST_CONFIG: InputListProps = {
	id: "article-source-list",
	type: EditInputs.inputList,
	label: "Article Source List Object",
	createObject: false,
	inputs: [
		{
			id: "title",
			type: EditInputs.text,
			label: "Title",
		},
		{
			id: "variant",
			type: EditInputs.select,
			label: "Variant",
			options: ["article", "audio", "video"],
		},
		{
			id: "categories",
			type: EditInputs.array,
			title: "Categories",
			createObject: false,
			input: {
				id: "category",
				type: EditInputs.text,
				label: "Category",
			},
		},
		{
			id: "region",
			type: EditInputs.array,
			title: "Region",
			createObject: false,
			input: {
				id: "region",
				type: EditInputs.text,
				label: "Region",
			},
		},
		{
			id: "coverage",
			type: EditInputs.array,
			title: "Coverage",
			createObject: false,
			input: {
				id: "coverage",
				type: EditInputs.text,
				label: "Coverage",
			},
		},
		{
			id: "language",
			type: EditInputs.text,
			label: "Language",
		},
		{
			id: "sources",
			type: EditInputs.array,
			title: "Sources",
			createObject: false,
			input: {
				id: "source",
				type: EditInputs.text,
				label: "Source ID",
			},
		},
		{
			id: "createdAt",
			type: EditInputs.text,
			label: "Created",
			disabled: true,
		},
		{
			id: "updatedAt",
			type: EditInputs.text,
			label: "Last Updated",
			disabled: true,
		},
	],
};
