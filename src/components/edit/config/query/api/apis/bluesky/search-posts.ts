import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const BLUESKY_SEARCH: InputListProps = {
	id: "blueskySearchPostsVariant",
	type: EditInputs.inputList,
	label: "BlueSky Search Posts Parameters",

	inputs: [
		{
			id: "BlueSkySearchPostsParams",
			type: EditInputs.title,
			title: "BlueSky Search Posts Params",
		},
		{
			id: "q",
			type: EditInputs.text,
			label: "query",
			required: true,
		},
		{
			id: "sort",
			type: EditInputs.select,
			label: "Sort",
			options: ["top", "latest"],
			defaultValue: "latest",
		},
		{
			id: "until",
			type: EditInputs.date,
			label: "Filter Until",
			required: false,
		},
		{
			id: "since",
			type: EditInputs.date,
			label: "Filter Since",
			required: false,
		},
		{
			id: "mentions",
			type: EditInputs.text,
			label: "Mentions - User @",
			required: false,
		},
		{
			id: "author",
			type: EditInputs.text,
			label: "Author - User @",
			required: false,
		},
		{
			id: "lang",
			// We should ultimately support a list?
			type: EditInputs.text, // should be list of available languages
			label: "Language",
			required: false,
		},
		{
			id: "domain",
			type: EditInputs.text,
			label: "Domain",
			required: false,
		},
		{
			id: "url",
			type: EditInputs.text,
			label: "URL",
			required: false,
		},
		{
			id: "tag",
			type: EditInputs.text,
			label: "Hashtag",
			required: false,
		},
		{
			id: "limit",
			type: EditInputs.number,
			label: "Limit",
			min: 1,
			max: 100,
			defaultValue: 25,
		},
		{
			id: "cursor",
			type: EditInputs.text,
			label: "Cursor",
			required: false,
		},
	],
};
