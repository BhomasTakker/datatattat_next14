import {
	getWithConfig,
	QueryOptions,
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
			options: [
				// we need to  add this after we determine variant
				QueryOptions.NONE,
				QueryOptions.API_QUERY,
				QueryOptions.HTML_META_QUERY,
				QueryOptions.MANUAL_VIDEO_SOURCES,
				QueryOptions.RSS,
			],
			// defaultSelection: QueryOptions.API_QUERY,
			apiConfigOptions: {
				options: [APIOptions.ARTICLES_SEARCH_API, APIOptions.YOUTUBE_API],
				defaultSelection: APIOptions.ARTICLES_SEARCH_API,
			},
		}),
	],
};
