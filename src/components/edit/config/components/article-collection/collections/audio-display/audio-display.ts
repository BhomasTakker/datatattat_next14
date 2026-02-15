import { AudioVerticalScrollerSize } from "@/components/content/components/article-collection/collections/audio-display/audio-display";
import {
	getWithConfig,
	QueryOptions,
} from "@/components/edit/config/query/_with-config";
import { APIOptions } from "@/components/edit/config/query/api/api-base-config";
import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const AUDIO_DISPLAY: InputListProps = {
	id: "audioDisplay",
	type: EditInputs.inputList,
	label: "Audio Display",
	inputs: [
		{
			id: "audioDisplayTitle",
			type: EditInputs.title,
			title: "Audio Display",
		},
		{
			id: "audioDisplayDescription",
			type: EditInputs.description,
			text: "This component displays a collection of audio tracks.",
		},
		{
			id: "size",
			type: EditInputs.select,
			label: "Audio Display Size",
			defaultValue: AudioVerticalScrollerSize.medium,
			required: true,
			options: [...Object.values(AudioVerticalScrollerSize)],
		},
		// needs adding to variant type
		getWithConfig({
			options: [
				QueryOptions.API_QUERY,
				QueryOptions.HTML_META_QUERY,
				QueryOptions.RSS,
			],
			// defaultSelection: QueryOptions.API_QUERY,
			apiConfigOptions: {
				options: [APIOptions.ARTICLES_SEARCH_API],
				defaultSelection: APIOptions.ARTICLES_SEARCH_API,
			},
		}),
	],
};
