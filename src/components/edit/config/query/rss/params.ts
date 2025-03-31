import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";

const ArticleVariants = {
	article: "article",
	video: "video",
	audio: "audio",
} as const;

export const NEW_PARAMS: GenericInput[] = [
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
			ArticleVariants.article,
			ArticleVariants.video,
			ArticleVariants.audio,
		],
		defaultValue: ArticleVariants.article,
		required: true,
	},
];
