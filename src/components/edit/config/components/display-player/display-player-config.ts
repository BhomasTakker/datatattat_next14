import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const DISPLAY_PLAYER_CONFIG: InputListProps = {
	id: "displayPlayerComponent",
	type: EditInputs.inputList,
	label: "Display Player Component",
	inputs: [
		{
			id: "displayPlayerComponentTitle",
			type: EditInputs.title,
			title: "Display Player Component",
		},
		// Update with - something like filling out a playlist
		// getWithConfig({ options: [QueryOptions.NONE, QueryOptions.OEMBED] }),
	],
};
