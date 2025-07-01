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
