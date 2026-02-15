import {
	PlayerCollectionVariant,
	PlayerSourceTypes,
} from "@/components/content/components/article-collection/collections/video-display/structs";
import {
	getWithConfig,
	QueryOptions,
} from "@/components/edit/config/query/_with-config";
import { APIOptions } from "@/components/edit/config/query/api/api-base-config";
import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

// We may need video source

export const VIDEO_DISPLAY: InputListProps = {
	id: "videoDisplay",
	type: EditInputs.inputList,
	label: "Video Display",
	inputs: [
		{
			id: "videoDisplayTitle",
			type: EditInputs.title,
			title: "Video Display",
		},
		{
			id: "videoDisplayDescription",
			type: EditInputs.description,
			text: "This component displays a collection of videos in a vertical or horizontal scroll. Please note currently only youtube videos are available.",
		},
		{
			id: "variant",
			type: EditInputs.select,
			label: "Video Display Variant",
			defaultValue: PlayerCollectionVariant.VerticalScroll,
			required: true,
			options: [
				PlayerCollectionVariant.VerticalScroll,
				PlayerCollectionVariant.HorizontalScroll,
			],
		},
		{
			id: "sourceType",
			type: EditInputs.select,
			label: "Video Source Type",
			defaultValue: PlayerSourceTypes.Youtube,
			required: false,
			options: [
				PlayerSourceTypes.Youtube,
				// PlayerSourceTypes.Vimeo,
				// PlayerSourceTypes.Mp4,
			],
		},
		// needs adding to variant type
		getWithConfig({
			options: [
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
