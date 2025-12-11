import { EditInputs } from "@/components/edit/inputs/inputs";
import { ObjectSelectProps } from "@/types/edit/inputs/inputs";
import { ARTICLE_MEDIA } from "./article-media.config";
import { AUDIO_MEDIA } from "./audio-media.config";
import { VIDEO_MEDIA } from "./video-media.config";

export const ARTICLE_VARIANT: ObjectSelectProps = {
	id: "variant",
	type: EditInputs.objectSelect,
	label: "Article Variant",
	options: ["article", "video", "audio"],
	defaultValue: "article",
	required: true,
	optionMap: new Map([
		["article", ARTICLE_MEDIA],
		["video", VIDEO_MEDIA],
		["audio", AUDIO_MEDIA],
	]),
};
