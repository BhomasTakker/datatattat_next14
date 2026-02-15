import { getWithConfig } from "@/components/edit/config/query/_with-config";
import { APIOptions } from "@/components/edit/config/query/api/api-base-config";
import { ARTICLE_OPTIONS } from "@/components/edit/config/query/types";
import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const GRID_DISPLAY: InputListProps = {
	id: "gridDisplay",
	type: EditInputs.inputList,
	label: "Grid Display",
	inputs: [
		// needs adding to variant type
		getWithConfig({
			options: ARTICLE_OPTIONS,
			// defaultSelection: QueryOptions.API_QUERY,
			apiConfigOptions: {
				options: [APIOptions.ARTICLES_SEARCH_API, APIOptions.YOUTUBE_API],
				defaultSelection: APIOptions.ARTICLES_SEARCH_API,
			},
		}),
	],
};
