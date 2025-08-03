import { EditInputs } from "@/components/edit/inputs/inputs";
import { PageStackCollectionVariants } from "@/types/components/page/stack";
import { InputListProps } from "@/types/edit/inputs/inputs";

const VERTICAL_STACK: InputListProps = {
	id: "verticalStack",
	type: EditInputs.inputList,
	label: "Page Stack",

	inputs: [],
};

const ROW_STACK: InputListProps = {
	id: "rowStack",
	type: EditInputs.inputList,
	label: "Page Stack",

	inputs: [],
};

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
