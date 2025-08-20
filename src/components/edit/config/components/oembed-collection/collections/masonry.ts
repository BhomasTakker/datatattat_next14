import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";
import { useContainerWidth } from "../../../shared/content";

export const OEMBED_MASONRY_CONFIG: InputListProps = {
	id: "masonry",
	type: EditInputs.inputList,
	label: "Masonry",
	inputs: [
		{
			id: "oembedComponentTitle",
			type: EditInputs.title,
			title: "Oembed Masonry Component",
		},
		useContainerWidth("minWidth", "Container Width"),
	],
};
