import { EditInputs } from "@/components/edit/inputs/inputs";
import {
	PageStackSizeOptions,
	PageStackVariant,
} from "@/types/components/page/stack";
import { InputListProps } from "@/types/edit/inputs/inputs";

const VERTICAL_STACK: InputListProps = {
	id: "vrticalStack",
	type: EditInputs.inputList,
	label: "Page Stack",

	inputs: [
		{
			id: "height",
			type: EditInputs.select,
			label: "Component Height",
			options: [...Object.values(PageStackSizeOptions)],
			defaultValue: PageStackSizeOptions.Free,
		},
		{
			id: "width",
			type: EditInputs.select,
			label: "Component Width",
			options: [...Object.values(PageStackSizeOptions)],
			defaultValue: PageStackSizeOptions.Free,
		},
	],
};
const HORIZONTAL_STACK: InputListProps = {
	id: "horizontalStack",
	type: EditInputs.inputList,
	label: "Page Stack",

	inputs: [
		{
			id: "height",
			type: EditInputs.select,
			label: "Component Height",
			options: [...Object.values(PageStackSizeOptions)],
			defaultValue: PageStackSizeOptions.Free,
		},
		{
			id: "width",
			type: EditInputs.select,
			label: "Component Width",
			options: [...Object.values(PageStackSizeOptions)],
			defaultValue: PageStackSizeOptions.Free,
		},
	],
};

const pageStackMap = new Map<string, InputListProps>([
	[PageStackVariant.Vertical, VERTICAL_STACK],
	[PageStackVariant.Horizontal, HORIZONTAL_STACK],
]);

export const PAGE_STACK_CONFIG: InputListProps = {
	id: "stack",
	type: EditInputs.inputList,
	label: "Page Stack",

	inputs: [
		{
			id: "variant",
			type: EditInputs.objectSelect,
			label: "Stack Variant",
			options: [...Object.values(PageStackVariant)],
			optionMap: pageStackMap,
			defaultValue: PageStackVariant.Vertical,
			// optionId: "id",
		},
	],
};
