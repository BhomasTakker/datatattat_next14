import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";

const PARAMS: GenericInput[] = [
	{
		id: "window",
		type: EditInputs.select,
		label: "Time Window",
		options: [
			"hour",
			"threeHours",
			"sixHours",
			"twelveHours",
			"day",
			"threeDays",
			"week",
		],
		defaultValue: "hour",
		required: true,
	},
	{
		id: "variant",
		type: EditInputs.select,
		label: "Variant",
		options: ["page"],
		defaultValue: "page",
		required: true,
	},
	{
		// duplicate  - arguably create a shared lib
		id: "limit",
		type: EditInputs.number,
		label: "Limit",
		min: 1,
		max: 100,
		defaultValue: 10,
		required: false,
	},
];

export const ARTICLES_TRENDING_SEARCH_API_CONFIG: InputListProps = {
	id: "articlesTrendingSearchApi",
	type: EditInputs.inputList,
	label: "Trending Articles Search API",

	inputs: [
		{
			id: "trendingSearchApiTitle",
			type: EditInputs.title,
			title: "Trending Articles Search API",
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
