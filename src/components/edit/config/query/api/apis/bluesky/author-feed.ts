import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const BLUESKY_AUTHOR_FEED: InputListProps = {
	id: "blueskyAuthorFeedVariant",
	type: EditInputs.inputList,
	label: "BlueSky Author Feed Parameters",

	inputs: [
		{
			id: "BlueSkyAuthorFeedParams",
			type: EditInputs.title,
			title: "BlueSky Author Feed Params",
		},
		{
			id: "authorIdInfo",
			type: EditInputs.description,
			text: "You can get the author id by editing the url with the required user handle (Don't include <>). https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=<user_handle>.bsky.social. When adding the author id make sure to add the whole id - i.e. did:plc:<id>",
		},
		{
			id: "actor",
			type: EditInputs.text,
			label: "Author ID",
			required: true,
		},
		{
			id: "filter",
			type: EditInputs.select,
			label: "Filter",
			options: [
				"posts_with_replies",
				"posts_no_replies",
				"posts_with_media",
				"posts_and_author_threads",
			],
			defaultValue: "posts_with_replies",
			required: true,
		},
		{
			id: "limit",
			type: EditInputs.number,
			label: "Limit",
			min: 1,
			defaultValue: 10,
			max: 100,
			required: false,
		},
		// {
		//   note: 'We should have a visible property to hide this input if not needed',
		// 	id: "cursor",
		// 	type: EditInputs.text,
		// 	label: "Cursor",
		// 	required: false,
		// },
	],
};
