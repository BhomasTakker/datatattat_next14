import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";

const PARAMS: GenericInput[] = [
	{
		id: "q",
		type: EditInputs.text,
		label: "Text Search",
		required: false,
		// searches title / use - to exclude words 'to search a phrase'
	},
	// {
	// 	info: 'Only for returning videos from a particlular channel',
	// 	id: 'channelId',
	// 	type: EditInputs.text,
	// 	label: 'Channel ID',
	// 	required: false,
	// },
	// {
	// 	id: "string",
	// 	label: "Event Type",
	// 	type: EditInputs.select,
	// 	options: ["", "completed", "live", "upcoming"],
	// },
	{
		id: "location",
		type: EditInputs.text,
		label: "Location",
		required: false,
	},
	{
		id: "locationRadius",
		type: EditInputs.text,
		label: "Location Radius",
		required: false,
	},
	{
		id: "maxResults",
		type: EditInputs.number,
		label: "Max Results - Max 50, Default 5",
		required: false,
		// searches title / use - to exclude words 'to search a phrase'
	},
	{
		id: "order",
		label: "Search Order",
		type: EditInputs.select,
		options: ["", "date", "rating", "relevance", "title", "viewCount"],
		required: false,
	},
	{
		id: "publishedAfter",
		type: EditInputs.date,
		label: "Published After",
		required: false,
	},
	{
		id: "publishedBefore",
		type: EditInputs.date,
		label: "Published Before",
		required: false,
	},
	{
		id: "relevanceLanguage",
		label: "Language",
		type: EditInputs.select,
		options: ["en"],
	},
	{
		id: "safeSearch",
		label: "Safe Search",
		type: EditInputs.select,
		options: ["", "moderate", "none", "strict"],
	},
	// {
	// 	// freebase topic id?
	// 	// News & Politics
	// 	id: "topicId",
	// 	type: EditInputs.text,
	// 	label: "Topic ID",
	// 	required: false,
	// },
	{
		id: "videoDuration",
		type: EditInputs.select,
		label: "Video Duration",
		options: ["any", "long", "medium", "short"],
		defaultValue: "any",
	},
	// {
	// 	id: "videoType",
	// 	type: EditInputs.select,
	// 	label: "Video Type",
	// 	options: ["any", "episode", "movie"],
	// 	defaultValue: "any",
	// },
];

export const YOUTUBE_API_CONFIG: InputListProps = {
	id: "youtubeApi",
	type: EditInputs.inputList,
	label: "YouTube Search API",

	inputs: [
		{
			id: "YouTubeApiTitle",
			type: EditInputs.title,
			title: "YouTube Search API",
		},
		{
			id: "params",
			type: EditInputs.inputList,
			label: "API QUERY PARAMS",

			createObject: true,

			inputs: PARAMS,
		},
	],
};
