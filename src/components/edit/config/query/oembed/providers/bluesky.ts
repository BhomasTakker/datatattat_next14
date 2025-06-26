import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";

export const BLUESKY_OEMBED_CONFIG: GenericInput = {
	id: "blueskyOembedParams",
	type: EditInputs.inputList,
	label: "BlueSky Oembed Parameters",

	inputs: [
		{
			id: "account",
			type: EditInputs.text,
			label: "BlueSky Account",
		},
		{
			id: "postId",
			type: EditInputs.text,
			label: "Post ID",
			validation: {
				required: true,
				minLength: 13,
				maxLength: 13, // Bluesky post IDs are typically 13 characters long
			},
		},
	],
};
