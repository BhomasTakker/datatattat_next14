import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";

// RSS Variants
const RSSVariants = {
	article: "article",
	video: "video",
	audio: "audio",
	oembed: "oembed",
} as const;

export const RSS_PARAMS: GenericInput[] = [
	{
		id: "parameters",
		type: EditInputs.title,
		title: "RSS Query Parameters",
	},
	{
		id: "url",
		type: EditInputs.url, // URL
		label: "Add URL",
	},
	{
		id: "variant",
		type: EditInputs.select,
		label: "Select Variant",
		options: [
			RSSVariants.article,
			RSSVariants.video,
			RSSVariants.audio,
			RSSVariants.oembed,
		],
		defaultValue: RSSVariants.article,
		required: true,
	},
];
