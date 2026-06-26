import { EditInputs } from "@/components/edit/inputs/inputs";
import {
	DescriptionInputProps,
	GenericInput,
	InputListProps,
} from "@/types/edit/inputs/inputs";
import { dynamicVariantInput, variantInput, Variants } from "./variants";
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
	{
		id: "searchFilterGroup",
		type: EditInputs.group,
		inputs: [coverageInput, providerInput],
	},
	///////////////////////////////////////////
	dateInputs,
	trustInputs,
	/////
	{
		id: "sortAndLimit",
		type: EditInputs.group,
		inputs: [sortInput, limitInput],
	},
];

const searchDescriptionInput: DescriptionInputProps = {
	id: "searchDescription",
	type: EditInputs.description,
	text: "Seperate search terms with ','. To search phrases use double quotes.",
};

export const PARAMS: GenericInput[] = [
	variantInput,
	searchDescriptionInput,
	containsInput,
	{
		id: "mustContainGroup",
		type: EditInputs.group,
		inputs: [mustContainInput, mustNotContainInput],
	},
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

// Simple Article Search - Will create a Simple Video Search - create Audio when back up
// Then create Full/Advanced searches
const SIMPLE_PARAMS: GenericInput[] = [
	containsInput,
	{
		id: "simpleSearchApiGroup",
		type: EditInputs.group,
		inputs: [
			dynamicVariantInput({ options: [Variants.article, Variants.video] }),
			coverageInput,
			andRegion,
		],
	},
	{
		id: "simpleSearchApiGroup2",
		type: EditInputs.group,
		inputs: [withinInput, sortInput, limitInput],
	},
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
			size: "large",
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
