import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";

// BASE_PARAMS

// ARTICLE_PARAMS
// VIDEO_PARAMS
// AUDIO_PARAMS

const BASE_PARAMS: GenericInput[] = [
	{
		// Select from available options uk, us, world, all
		// select? or array? / multi select
		id: "region",
		type: EditInputs.select,
		options: ["uk", "us", "world"],
		deselectLabel: "All",
		label: "Region",
		required: false,
	},
	// fix these
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

export enum Variants {
	article = "article",
	video = "video",
	audio = "audio",
}

const ARTICLE_PARAMS: InputListProps = {
	id: "stackScroller",
	type: EditInputs.inputList,
	label: "Stack Scroller",
	inputs: [],
};

const VIDEO_PARAMS: InputListProps = {
	id: "stackScroller",
	type: EditInputs.inputList,
	label: "Stack Scroller",
	inputs: [],
};

const AUDIO_PARAMS: InputListProps = {
	id: "audio-params",
	type: EditInputs.inputList,
	inputs: [
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
	],
};

const variantMap = new Map<string, InputListProps>([
	[Variants.article, ARTICLE_PARAMS],
	[Variants.video, VIDEO_PARAMS],
	[Variants.audio, AUDIO_PARAMS],
]);

export const PARAMS: GenericInput[] = [
	{
		id: "variant",
		type: EditInputs.objectSelect,
		label: "Variant",
		defaultValue: "article",
		required: true,
		options: [Variants.article, Variants.video, Variants.audio],
		optionMap: variantMap,
		// we are saved on comopnent props object - our parent
		optionId: undefined, // "variantProps",
	},
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
	...BASE_PARAMS,
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
