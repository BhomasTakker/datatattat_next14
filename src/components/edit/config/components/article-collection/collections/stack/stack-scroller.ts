import {
	ARTICLE_OPTIONS,
	getWithConfig,
} from "@/components/edit/config/query/_with-config";
import { APIOptions } from "@/components/edit/config/query/api/api-base-config";
import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const STACK_SCROLLER_CONFIG: InputListProps = {
	id: "stackScroller",
	type: EditInputs.inputList,
	label: "Stack Scroller",
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
