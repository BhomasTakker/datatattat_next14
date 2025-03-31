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

export const PARAMS: GenericInput[] = [
	{
		id: "parameters",
		type: EditInputs.title,
		title: "RSS Query Parameters",
	},
	{
		id: "urls",
		type: EditInputs.array,
		label: "Add URLs",
		title: "Select URLs",
		createObject: false,
		// We need to allow an object 'shape'
		// This just saves an array and not an array of objects
		input: {
			id: "url",
			type: EditInputs.text,
			label: "url",
		},
	},
];
