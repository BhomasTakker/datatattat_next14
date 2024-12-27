import { ComponentDataOptions } from "@/lib/api/component-data/component-data-options";
import { EditInputs } from "../../inputs/inputs";
import { RSS_QUERY_CONFIG } from "./rss/rss-config";
import { GenericInput } from "@/types/edit/inputs/inputs";

enum QueryOptions {
	NONE = "none",
	RSS_QUERY = ComponentDataOptions.RSS_QUERY,
}

type queryContainersProps = null | typeof RSS_QUERY_CONFIG;

const componentQueriesMap = new Map<string, queryContainersProps>([
	[QueryOptions.NONE, null],
	[QueryOptions.RSS_QUERY, RSS_QUERY_CONFIG],
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
			options: [QueryOptions.NONE, QueryOptions.RSS_QUERY],
			optionMap: componentQueriesMap,
			optionId: "query",
		},
	],
};
