import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const STACK_SCROLLER_CONFIG: InputListProps = {
	id: "stackScroller",
	type: EditInputs.inputList,
	label: "Stack Scroller",
	inputs: [
		{
			id: "stackScrollerTitle",
			type: EditInputs.title,
			title: "Stack Scroller",
		},
		{
			id: "test",
			type: EditInputs.text,
			label: "Test",
			defaultValue: "test",
		},
	],
};
