import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";
import { ARTICLES_SEARCH_API_CONFIG } from "./apis/articles-seacrh-api";
import { YOUTUBE_API_CONFIG } from "./apis/youtube-api";
import { BLUESKY_API_CONFIG } from "./apis/bluesky/bluesky-api";

// Should be more global type/ struct we use these options elsewhere

export enum APIOptions {
	NONE = "none",
	ARTICLES_SEARCH_API = "articles-search-api",
	YOUTUBE_API = "youtube-api",
	BLUESKY_API = "bluesky-api",
}

// All just InputListProps
type apiContainersProps =
	| null
	| typeof ARTICLES_SEARCH_API_CONFIG
	| typeof YOUTUBE_API_CONFIG
	| typeof BLUESKY_API_CONFIG;

const apiMap = new Map<string, apiContainersProps>([
	[APIOptions.NONE, null],
	[APIOptions.ARTICLES_SEARCH_API, ARTICLES_SEARCH_API_CONFIG],
	[APIOptions.YOUTUBE_API, YOUTUBE_API_CONFIG],
	[APIOptions.BLUESKY_API, BLUESKY_API_CONFIG], // Placeholder for future BlueSky API config
]);

export type GetAPIConfig = {
	options?: APIOptions[];
	defaultSelection?: APIOptions;
};

export const getAPIConfig = ({
	options,
	defaultSelection,
}: GetAPIConfig): GenericInput => {
	return {
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
				label: "Select API",
				required: true,
				defaultValue: defaultSelection || APIOptions.NONE,
				options: options || [...apiMap.keys()],
				optionMap: apiMap,
			},
		],
	};
};
