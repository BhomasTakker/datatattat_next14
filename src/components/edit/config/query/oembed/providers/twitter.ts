import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";

export const TWITTER_OEMBED_CONFIG: InputListProps = {
	id: "twitterOembedParams",
	type: EditInputs.inputList,
	label: "Twitter Oembed Parameters",
	createObject: false,

	inputs: [
		{
			id: "account",
			type: EditInputs.text,
			label: "Twitter Account",
		},
		{
			id: "tweetId",
			type: EditInputs.text,
			label: "Tweet ID",
			validation: {
				required: true,
				minLength: 19,
				maxLength: 19, // Twitter tweet IDs are typically 19 characters long
			},
		},
	],
};
