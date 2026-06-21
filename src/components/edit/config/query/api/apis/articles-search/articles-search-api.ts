import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";
import { variantInput } from "./variants";
import {
	containsInput,
	mustContainInput,
	mustNotContainInput,
	shouldContainInput,
} from "./search-inputs";
import { andRegion, regionInputs } from "./region-inputs";
import { dateInputs, withinInput } from "./date-inputs";
import {
	coverageInput,
	limitInput,
	providerInput,
	sortInput,
	trustInputs,
} from "./inputs";

const BASE_PARAMS: GenericInput[] = [
	...regionInputs,
	coverageInput,
	///////////////////////////////////////////
	...dateInputs,
	// provider options?
	providerInput,
	...trustInputs,
	/////
	sortInput,
	limitInput,
];

export const PARAMS: GenericInput[] = [
	variantInput,
	containsInput,
	mustContainInput,
	mustNotContainInput,
	...shouldContainInput,
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

// Advanced Search API config
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

const SIMPLE_PARAMS: GenericInput[] = [
	variantInput,
	containsInput,
	andRegion,
	coverageInput,
	withinInput,
	sortInput,
	limitInput,
];

export const SIMPLE_SEARCH_API_CONFIG: InputListProps = {
	id: "articlesSearchApi",
	type: EditInputs.inputList,
	label: "Simple Search API",
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

			inputs: SIMPLE_PARAMS,
		},
	],
};
