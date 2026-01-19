import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const ARTICLE_PROVIDER_CONFIG: InputListProps = {
	id: "articleProvider",
	type: EditInputs.inputList,
	label: "Article Provider Object",
	createObject: false,
	inputs: [
		{
			id: "ArticleProviderPropertiesTitle",
			type: EditInputs.title,
			title: "Article Provider",
		},
		{
			id: "name",
			type: EditInputs.text,
			label: "Name",
			required: true,
			validation: {
				required: true,
			},
		},
		{
			id: "description",
			type: EditInputs.text,
			label: "Description",
			required: true,
			validation: {
				required: true,
			},
		},
		{
			id: "url",
			type: EditInputs.url,
			label: "URL",
			required: true,
			validation: {
				required: true,
			},
		},
		{
			id: "rating",
			type: EditInputs.number,
			label: "Rating",
			required: true,
			min: 0,
			max: 100,
			step: 1,
			defaultValue: 75,
			validation: {
				required: true,
				min: 0,
				max: 100,
			},
		},
		{
			id: "leaning",
			type: EditInputs.number,
			label: "Leaning",
			required: true,
			min: -10,
			max: 10,
			step: 0.1,
			defaultValue: 0,
			validation: {
				required: true,
				min: -1,
				max: 1,
			},
		},
		{
			id: "origin",
			type: EditInputs.text,
			label: "Origin",
			required: true,
			validation: {
				required: true,
			},
		},
		{
			id: "logo",
			type: EditInputs.url,
			label: "Logo URL",
			required: false,
		},
	],
};
