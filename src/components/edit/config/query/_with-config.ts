import { ComponentDataOptions } from "@/lib/api/component-data/component-data-options";
import { EditInputs } from "../../inputs/inputs";
import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";
import { HTML_META_QUERY_CONFIG } from "./html/meta-config";
import { APIOptions, GetAPIConfig, getAPIConfig } from "./api/api-base-config";
import { RSS_CONFIG } from "./rss/rss-config";
import { OEMBED_CONFIG } from "./oembed/oembed-config";

export enum QueryOptions {
	NONE = "none",
	RSS = ComponentDataOptions.RSS,
	OEMBED = ComponentDataOptions.OEMBED,
	API_QUERY = ComponentDataOptions.API_QUERY,
	HTML_META_QUERY = ComponentDataOptions.HTML_META_QUERY,
}

type queryContainersProps =
	| null
	| typeof RSS_CONFIG
	| typeof OEMBED_CONFIG
	| typeof HTML_META_QUERY_CONFIG
	| GenericInput;

type ComponentQueryOptions = {
	rssOptions?: object;
	oembedOptions?: object;
	apiOptions?: GetAPIConfig;
	metaOptions?: object;
};

export const getComponentQueries = ({
	rssOptions = {},
	oembedOptions = {},
	apiOptions = {},
	metaOptions = {},
}: ComponentQueryOptions = {}) => {
	return new Map<string, queryContainersProps>([
		[QueryOptions.NONE, null],
		[QueryOptions.RSS, RSS_CONFIG],
		[QueryOptions.OEMBED, OEMBED_CONFIG],
		[QueryOptions.API_QUERY, getAPIConfig(apiOptions)],
		[QueryOptions.HTML_META_QUERY, HTML_META_QUERY_CONFIG],
	]);
};

type APIConfigOptions = {
	options: APIOptions[];
	defaultSelection?: APIOptions;
};

type GetWithConfig = {
	options: QueryOptions[];
	defaultSelection?: QueryOptions;
	apiConfigOptions?: APIConfigOptions;
};

// pass options OR id ??
export const getWithConfig = ({
	options,
	defaultSelection = QueryOptions.NONE,
	apiConfigOptions,
}: GetWithConfig): InputListProps => {
	// create a map of config options
	// We can then use a function to return the config based on parameters
	const componentQueriesMap = getComponentQueries({
		apiOptions: apiConfigOptions,
	});

	return {
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
				resetOnChange: true,
				type: EditInputs.objectSelect,
				label: "Select Data Source",
				required: true,
				// default to NONE and all
				defaultValue: defaultSelection,
				options,
				optionMap: componentQueriesMap,
				optionId: "query",
			},
		],
	};
};
