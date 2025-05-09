import { ComponentDataOptions } from "@/lib/api/component-data/component-data-options";
import { EditInputs } from "../../inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";
import { HTML_META_QUERY_CONFIG } from "./html/meta-config";
import { API_BASE_QUERY_CONFIG } from "./api/api-base-config";
import { RSS_CONFIG } from "./rss/rss-config";

enum QueryOptions {
	NONE = "none",
	RSS = ComponentDataOptions.RSS,
	API_QUERY = ComponentDataOptions.API_QUERY,
	HTML_META_QUERY = ComponentDataOptions.HTML_META_QUERY,
}

type queryContainersProps =
	| null
	| typeof RSS_CONFIG
	| typeof API_BASE_QUERY_CONFIG
	| typeof HTML_META_QUERY_CONFIG;

const componentQueriesMap = new Map<string, queryContainersProps>([
	[QueryOptions.NONE, null],
	[QueryOptions.RSS, RSS_CONFIG],
	[QueryOptions.API_QUERY, API_BASE_QUERY_CONFIG],
	[QueryOptions.HTML_META_QUERY, HTML_META_QUERY_CONFIG],
]);

export const WITH_CONFIG: GenericInput = {
	id: "_with",
	type: EditInputs.inputList,
	label: "Data Source",
	createObject: true,

	inputs: [
		{
			id: "withObjectTitle",
			type: EditInputs.title,
			title: "Data Source",
		},
		// Would effectively mean that any type will have use a query object
		// unless you dont add an object id
		// AND the query object is an inputList on the required object. oof
		{
			id: "type",
			type: EditInputs.objectSelect,
			label: "Select Data Source",
			required: true,
			defaultValue: QueryOptions.NONE,
			options: [
				QueryOptions.NONE,
				QueryOptions.RSS,
				QueryOptions.API_QUERY,
				QueryOptions.HTML_META_QUERY,
			],
			optionMap: componentQueriesMap,
			optionId: "query",
		},
	],
};
