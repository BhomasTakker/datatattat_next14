import { EditInputs } from "@/components/edit/inputs/inputs";
import { PARAMS } from "./params";
import { RSS_CONVERSIONS } from "./conversions/conversions";
import { GenericInput } from "@/types/edit/inputs/inputs";

export const RSS_QUERY_CONFIG: GenericInput = {
	id: "rssQuery",
	type: EditInputs.inputList,
	label: "RSS QUERY",

	inputs: [
		{
			id: "rssQueryTitle",
			type: EditInputs.title,
			title: "RSS Query",
		},
		// for an rss query we 'should' just take the urls
		// anything more is unrequired
		// Why are we using provider and queryId in the POC?
		{
			id: "params",
			type: EditInputs.inputList,
			label: "RSS QUERY PARAMS",
			// better name etc required here

			createObject: true,

			inputs: PARAMS,
		},
		{
			id: "conversions",
			type: EditInputs.inputList,
			label: "RSS QUERY CONVERSIONS",
			createObject: true,

			inputs: RSS_CONVERSIONS as GenericInput[],
		},
	],
};
