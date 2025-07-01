import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const BLUESKY_FEED: InputListProps = {
	id: "blueskyFeedVariant",
	type: EditInputs.inputList,
	label: "BlueSky Feed Parameters",

	inputs: [
		{
			id: "BlueSkyFeedParams",
			type: EditInputs.title,
			title: "BlueSky Feed Params",
		},
		// change to author id & feed name?
		{
			id: "feed",
			type: EditInputs.text,
			label: "Feed",
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
