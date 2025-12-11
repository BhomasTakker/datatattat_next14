import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";

export const DETAILS: GenericInput[] = [
	{
		id: "DetailsTitle",
		type: EditInputs.title,
		title: "Details",
		header: "h3",
	},
	{
		id: "details",
		type: EditInputs.inputList,
		label: "Details",
		createObject: true,
		inputs: [
			{
				id: "published",
				type: EditInputs.text,
				label: "Published Date",
				required: false,
			},
			{
				id: "modified",
				type: EditInputs.date,
				label: "Modified Date",
				required: false,
			},
			{
				id: "docs",
				type: EditInputs.array,
				title: "Documents",
				createObject: false,
				input: {
					id: "doc",
					type: EditInputs.url,
					label: "Document URL",
				},
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
				id: "authors",
				type: EditInputs.array,
				title: "Authors",
				createObject: false,
				input: {
					id: "author",
					type: EditInputs.text,
					label: "Author",
				},
			},
			{
				id: "publishers",
				type: EditInputs.array,
				title: "Publishers",
				createObject: false,
				input: {
					id: "publisher",
					type: EditInputs.text,
					label: "Publisher",
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
		],
	},
];
