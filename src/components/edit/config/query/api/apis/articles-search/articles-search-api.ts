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
	////////////////////////////////////
	// temp
	// I think just use a search and multi select
	// i.e. realtime update as you type
	// select multiple regions i.e Europe, UK, Manchester
	// to refine
	// Some way of select this or this
	// And do not select this
	////////////////////////////////////
	{
		id: "continent",
		type: EditInputs.select,
		options: [
			"Europe",
			"North America",
			"Asia",
			"Africa",
			"South America",
			"Oceania",
			"Antarctica",
		],
		deselectLabel: "All",
		label: "Continent",
		required: false,
	},
	{
		id: "country",
		type: EditInputs.select,
		options: ["England", "NI", "Scotland", "Wales"],
		deselectLabel: "All",
		label: "Country",
		required: false,
	},
	{
		id: "state",
		type: EditInputs.select,
		options: ["North West", "West Midlands"],
		deselectLabel: "All",
		label: "State",
		required: false,
	},
	{
		id: "city",
		type: EditInputs.select,
		options: ["Manchester", "Birmingham"],
		deselectLabel: "All",
		label: "City",
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
	// Categpries likely dependent on variant
	// {
	// 	id: "categories",
	// 	type: EditInputs.select,
	// 	label: "Categories",
	// 	required: false,
	// 	options: ["24/7"],
	// },
	// {
	// 	id: "query",
	// 	type: EditInputs.text,
	// 	label: "Text Search",
	// 	required: false,
	// 	// searches title / use - to exclude words 'to search a phrase'
	// },
	// split off into separate object
	// We also want to add a regex option for inputs
	{
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
