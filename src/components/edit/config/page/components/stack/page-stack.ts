import { EditInputs } from "@/components/edit/inputs/inputs";
import { PageStackCollectionVariants } from "@/types/components/page/stack";
import { InputListProps } from "@/types/edit/inputs/inputs";
import { ROW_STACK } from "./row-stack-variant";
import { VERTICAL_STACK } from "./vertical-stack-variant";

const pageStackMap = new Map<string, InputListProps>([
	[PageStackCollectionVariants.Vertical, VERTICAL_STACK],
	[PageStackCollectionVariants.RowStack, ROW_STACK],
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
			options: [...Object.values(PageStackCollectionVariants)],
			optionMap: pageStackMap,
			defaultValue: PageStackCollectionVariants.Vertical,
		},
	],
};
