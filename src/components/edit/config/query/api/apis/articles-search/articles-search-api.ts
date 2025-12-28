import { EditInputs } from "@/components/edit/inputs/inputs";
import {
	ArrayInputProps,
	GenericInput,
	InputListProps,
} from "@/types/edit/inputs/inputs";

// BASE_PARAMS

// ARTICLE_PARAMS
// VIDEO_PARAMS
// AUDIO_PARAMS

const REGION: ArrayInputProps = {
	id: "region",
	type: EditInputs.array,
	label: "Select Region",
	title: "Select Region (This AND This)",
	createObject: false,
	input: {
		id: "region",
		type: EditInputs.text,
		label: "Select Region",
	},
};

const OR_REGION: ArrayInputProps = {
	id: "orRegion",
	type: EditInputs.array,
	label: "Region",
	title: "Select Region (This OR This)",
	createObject: false,
	input: {
		id: "orRegion",
		type: EditInputs.text,
		label: "Region",
	},
};

const EXCLUDE_REGIONS: ArrayInputProps = {
	id: "excludeRegions",
	type: EditInputs.array,
	label: "Exclude Regions",
	title: "Exclude Regions",
	createObject: false,
	input: {
		id: "excludeRegions",
		type: EditInputs.text,
		label: "Exclude Regions",
	},
};

const REGION_INPUT: GenericInput[] = [
	{
		id: "regionInputsTitle",
		type: EditInputs.title,
		title: "Region Filters",
		size: "large",
	},
	REGION,
	OR_REGION,
	EXCLUDE_REGIONS,
];

const BASE_PARAMS: GenericInput[] = [
	...REGION_INPUT,
	{
		id: "coverage",
		type: EditInputs.select,
		options: ["international", "national", "regional", "local"],
		deselectLabel: "All",
		label: "Coverage",
		required: false,
	},
	///////////////////////////////////////////
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
		id: "within",
		type: EditInputs.select,
		label: "Within The Past",
		defaultValue: "none",
		options: [
			"1 hour",
			"2 hours",
			"3 hours",
			"6 hours",
			"12 hours",
			"1 day",
			"2 days",
			"3 days",
			"1 week",
			"2 weeks",
			"1 month",
			"3 months",
			"6 months",
			"1 year",
			"2 years",
		],
		required: false,
	},
	// provider options?
	{
		id: "provider",
		type: EditInputs.array,
		label: "Filter By Provider",
		title: "Provider",
		createObject: false,
		// we should turn off array item controls for this
		input: {
			id: "provider",
			type: EditInputs.text,
			label: "provider name",
		},
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
	/////
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
	inputs: [
		{
			id: "mediaType",
			type: EditInputs.select,
			label: "Media Type",
			required: false,
			options: ["24/7"],
		},
	],
};

const AUDIO_PARAMS: InputListProps = {
	id: "audio-params",
	type: EditInputs.inputList,
	inputs: [
		{
			id: "mediaType",
			type: EditInputs.select,
			label: "Media Type",
			required: false,
			// selecting radio should 'perhaps' change the options
			options: ["radio"],
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
		// check with other must!
		// We may be the wrong way round!
		id: "mustContain",
		type: EditInputs.array,
		label: "Contains",
		title: "Contains",
		createObject: false,
		input: {
			id: "must",
			type: EditInputs.text,
			label: "search term",
		},
	},
	{
		id: "mustNotContain",
		type: EditInputs.array,
		label: "Should Not Contain",
		title: "Should Not Contain",
		createObject: false,
		input: {
			id: "mustNot",
			type: EditInputs.text,
			label: "search term",
		},
	},
	{
		id: "shouldContain",
		type: EditInputs.array,
		label: "Should Contain",
		title: "Should Contain",
		createObject: false,
		input: {
			id: "should",
			type: EditInputs.text,
			label: "search term",
		},
	},
	{
		id: "minimumShouldMatchDescription",
		type: EditInputs.description,
		text: "If you have added 'should' values, you can set a minimum number of values to match. If 0 is set, 1 value should be set.",
	},
	{
		id: "minimumShouldMatch",
		type: EditInputs.number,
		label: "Minimum Should Match",
		required: false,
		step: 1,
		min: 0,
		defaultValue: 0,
	},
	{
		id: "filterContain",
		type: EditInputs.array,
		label: "Must Contain",
		title: "Must Contain",
		createObject: false,
		input: {
			id: "should",
			type: EditInputs.text,
			label: "search term",
		},
	},
	// {
	// 	id: "textScore",
	// 	type: EditInputs.number,
	// 	label: "Text Score",
	// 	required: false,
	// 	step: 0.01,
	// 	min: 0,
	// 	// searches title / use - to exclude words 'to search a phrase'
	// },
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
