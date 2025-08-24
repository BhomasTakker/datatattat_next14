import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";

export const TIKTOK_OEMBED_CONFIG: GenericInput = {
	id: "tiktokOembedParams",
	type: EditInputs.inputList,
	label: "TikTok Oembed Parameters",
	createObject: false,

	inputs: [
		{
			id: "account",
			type: EditInputs.text,
			label: "TikTok Account",
		},
		{
			id: "videoId",
			type: EditInputs.text,
			label: "Video ID",
			validation: {
				required: true,
				minLength: 19,
				maxLength: 19, // TikTok video IDs are typically 19 characters long
			},
		},
	],
};
