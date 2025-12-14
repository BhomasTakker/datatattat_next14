import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const ARTICLE_SOURCE_CONFIG: InputListProps = {
	id: "article-source",
	type: EditInputs.inputList,
	label: "Article Source Object",
	createObject: false,
	inputs: [
		{
			id: "name",
			type: EditInputs.text,
			label: "Name",
		},
		{
			id: "src",
			type: EditInputs.url,
			label: "Source URL",
		},
		{
			id: "collectionTitle",
			type: EditInputs.text,
			label: "Collection Title",
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
				// this is an enum or union
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
			id: "source",
			type: EditInputs.text,
			label: "Source",
		},
		{
			id: "mediaType",
			type: EditInputs.text,
			label: "Media Type",
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
