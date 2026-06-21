import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps, ObjectSelectProps } from "@/types/edit/inputs/inputs";

export enum Variants {
	article = "article",
	video = "video",
	audio = "audio",
	provider = "provider",
	page = "page",
}

const ARTICLE_PARAMS: InputListProps = {
	id: "article-params",
	type: EditInputs.inputList,
	label: "Article Params",
	inputs: [],
};

const VIDEO_PARAMS: InputListProps = {
	id: "video-params",
	type: EditInputs.inputList,
	label: "Video Params",
	inputs: [
		{
			id: "mediaType",
			type: EditInputs.select,
			label: "Media Type",
			required: false,
			options: ["24/7"],
		},
	],
};

const AUDIO_PARAMS: InputListProps = {
	id: "audio-params",
	type: EditInputs.inputList,
	inputs: [
		{
			id: "mediaType",
			type: EditInputs.select,
			label: "Media Type",
			required: false,
			// selecting radio should 'perhaps' change the options
			options: ["radio"],
		},
		{
			id: "durationHigher",
			type: EditInputs.number,
			label: "Duration (seconds) Higher Than",
			min: 0,
			required: false,
		},
		{
			id: "durationLower",
			type: EditInputs.number,
			label: "Duration (seconds) Lower Than",
			min: 0,
			required: false,
		},
	],
};

const PAGE_PARAMS: InputListProps = {
	id: "page-params",
	type: EditInputs.inputList,
	inputs: [
		{
			id: "pageType",
			type: EditInputs.select,
			label: "Page Type",
			required: false,
			options: ["Content", "User", "Landing"],
		},
	],
};

export const variantMap = new Map<string, InputListProps>([
	[Variants.article, ARTICLE_PARAMS],
	[Variants.video, VIDEO_PARAMS],
	[Variants.audio, AUDIO_PARAMS],
	// todo - create provider params
	[Variants.provider, ARTICLE_PARAMS],
	[Variants.page, PAGE_PARAMS],
]);

export const variantInput: ObjectSelectProps = {
	id: "variant",
	type: EditInputs.objectSelect,
	label: "Variant",
	defaultValue: "article",
	required: true,
	options: [
		Variants.article,
		Variants.video,
		Variants.audio,
		Variants.provider,
		Variants.page,
	],
	optionMap: variantMap,
	// we are saved on comopnent props object - our parent
	optionId: undefined, // "variantProps",
};
