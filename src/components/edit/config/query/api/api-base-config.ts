import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";
import { ARTICLES_SEARCH_API_CONFIG } from "./apis/articles-seacrh-api";
import { YOUTUBE_API_CONFIG } from "./apis/youtube-api";

// Should be more global type/ struct we use these options elsewhere
const APIOptions = {
	NONE: "none",
	ARTICLES_SEARCH_API: "articles-search-api",
	YOUTUBE_API: "youtube-api",
} as const;

type apiContainersProps = null | typeof ARTICLES_SEARCH_API_CONFIG;

const apiMap = new Map<string, apiContainersProps>([
	[APIOptions.NONE, null],
	[APIOptions.ARTICLES_SEARCH_API, ARTICLES_SEARCH_API_CONFIG],
	[APIOptions.YOUTUBE_API, YOUTUBE_API_CONFIG],
]);

export const API_BASE_QUERY_CONFIG: InputListProps = {
	id: "apiQuery",
	type: EditInputs.inputList,
	label: "API QUERY",

	inputs: [
		{
			id: "apiTitle",
			type: EditInputs.title,
			size: "large",
			title: "API",
		},
		{
			id: "provider",
			type: EditInputs.objectSelect,
			label: "Select Data Source",
			required: true,
			defaultValue: APIOptions.NONE,
			options: [...apiMap.keys()],
			optionMap: apiMap,
			// optionId: "api",
		},
	],
};
