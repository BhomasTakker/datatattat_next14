import { EditInputs } from "@/components/edit/inputs/inputs";
import { FetchFunction } from "@/types/cms/Cron";
import { ArrayInputProps, InputListProps } from "@/types/edit/inputs/inputs";
import { CRON_FUNCTION } from "../timer/timer-options";
import { APIOptions } from "@/components/edit/config/query/api/api-base-config";

const ROUTES: ArrayInputProps = {
	id: "routes",
	type: EditInputs.array,
	title: "Routes",
	createObject: false,
	input: {
		id: "routeItem",
		type: EditInputs.text,
		label: "Route Item",
		defaultValue: "/",
	},
};

const pageQueriesConfig: InputListProps = {
	id: "fetchFunctionData",
	type: EditInputs.inputList,
	label: "Page Queries Config",
	createObject: true,
	inputs: [
		{
			id: "api",
			type: EditInputs.select,
			label: "API",
			options: [APIOptions.ARTICLES_SEARCH_API],
			defaultValue: APIOptions.ARTICLES_SEARCH_API,
		},
		ROUTES,
	],
};

const pingRoutesConfig: InputListProps = {
	id: "fetchFunctionData",
	type: EditInputs.inputList,
	label: "Ping Routes Config",
	createObject: true,
	inputs: [ROUTES],
};

const radioScriptsConfig: InputListProps = {
	id: "fetchFunctionData",
	type: EditInputs.inputList,
	label: "Radio Scripts Config",
	createObject: true,
	inputs: [
		{
			id: "limit",
			type: EditInputs.number,
			label: "Limit",
			defaultValue: 100,
			max: 100,
			min: 1,
		},
		{
			id: "offset",
			type: EditInputs.number,
			label: "Offset",
			defaultValue: 0,
			min: 0,
		},
	],
};

const FETCH: InputListProps = {
	id: "fetchFunctionData",
	type: EditInputs.inputList,
	// label: "Cron Job Item",
	createObject: false,
	inputs: [
		{
			id: "fetchFunction",
			type: EditInputs.objectSelect,
			label: "Fetch Function",
			optionId: "fetchFunctionData",
			resetOnChange: true,
			options: [
				FetchFunction.PageQueries,
				FetchFunction.PingRoutes,
				FetchFunction.RadioScripts,
			],
			optionMap: new Map([
				[FetchFunction.PageQueries, pageQueriesConfig],
				[FetchFunction.PingRoutes, pingRoutesConfig],
				[FetchFunction.RadioScripts, radioScriptsConfig],
			]),
		},
	],
};

const API_CRON_JOB_ITEM_CONFIG: InputListProps = {
	id: "cron-item",
	type: EditInputs.inputList,
	label: "Cron Job Item",
	createObject: false,
	inputs: [...CRON_FUNCTION, FETCH],
};

export const API_CRON_JOB_CONFIG: InputListProps = {
	id: "cron-item",
	type: EditInputs.inputList,
	label: "Cron Job Item",
	createObject: false,
	inputs: [
		{
			id: "cron",
			type: EditInputs.array,
			title: "Cron Jobs",
			createObject: true,
			input: API_CRON_JOB_ITEM_CONFIG,
		},
	],
};
