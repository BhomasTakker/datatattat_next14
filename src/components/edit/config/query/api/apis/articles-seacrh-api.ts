import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";

export const PARAMS: GenericInput[] = [
	{
		id: "query",
		type: EditInputs.text,
		label: "Text Search",
		required: false,
		// searches title / use - to exclude words 'to search a phrase'
	},
	{
		id: "textScore",
		type: EditInputs.number,
		label: "Text Score",
		required: false,
		step: 0.01,
		min: 0,
		// searches title / use - to exclude words 'to search a phrase'
	},
	////////////////////////////////////////////////
	// We need to vary inputs based on the variant
	////////////////////////////////////////////////
	{
		id: "variant",
		type: EditInputs.select,
		label: "Variant",
		options: ["article", "video", "audio"],
		defaultValue: "article",
	},
	{
		id: "contentType",
		type: EditInputs.select,
		label: "Content Type",
		options: ["news"],
		defaultValue: "news",
	},
	{
		id: "durationHigher",
		type: EditInputs.number,
		label: "Duration (seconds) Higher Than",
		min: 0,
		required: false,
	},
	{
		id: "durationLower",
		type: EditInputs.number,
		label: "Duration (seconds) Lower Than",
		min: 0,
		required: false,
	},
	{
		// select? or array? / multi select
		id: "region",
		type: EditInputs.text,
		label: "Region",
		required: false,
	},
	{
		id: "origin",
		type: EditInputs.text,
		label: "Origin",
		required: false,
	},
	{
		// Probably a select / we only have english for now
		id: "language",
		type: EditInputs.text,
		label: "Language",
		required: false,
	},
	{
		id: "before",
		type: EditInputs.date,
		label: "Filter Before ",
		required: false,
	},
	{
		id: "after",
		type: EditInputs.date,
		label: "Filter After ",
		required: false,
	},
	{
		id: "provider",
		type: EditInputs.text,
		label: "Filter providers",
		required: false,
	},
	{
		id: "trustHigher",
		type: EditInputs.number,
		label: "Trust Rating Higher Than",
		max: 100,
		min: 0,
		required: false,
	},
	{
		id: "trustLower",
		type: EditInputs.number,
		label: "Trust Rating Lower Than",
		max: 100,
		min: 0,
		required: false,
	},
	{
		id: "leaningHigher",
		type: EditInputs.number,
		label: "Political Leaning >",
		max: 1,
		min: -1,
		required: false,
	},
	{
		id: "leaningLower",
		type: EditInputs.number,
		label: "Political Leaning <",
		max: 1,
		min: -1,
		required: false,
	},
	{
		id: "sort",
		type: EditInputs.select,
		label: "Sort",
		defaultValue: "none",
		options: ["none", "relevance", "date-ascending", "date-descending"],
		required: true,
	},
	{
		id: "limit",
		type: EditInputs.number,
		label: "Limit",
		required: false,
	},
];

export const ARTICLES_SEARCH_API_CONFIG: InputListProps = {
	id: "articlesSearchApi",
	type: EditInputs.inputList,
	label: "Articles Search API",

	inputs: [
		{
			id: "articlesSearchApiTitle",
			type: EditInputs.title,
			title: "Articles Search API",
		},
		// Probably type of search object select
		{
			id: "params",
			type: EditInputs.inputList,
			label: "API QUERY PARAMS",

			createObject: true,

			inputs: PARAMS,
		},
	],
};
