import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const PAGE_STACK_CONFIG: InputListProps = {
	id: "stack",
	type: EditInputs.inputList,
	label: "Page Stack",

	inputs: [
		{
			id: "pageStackTitle",
			type: EditInputs.title,
			title: "Stack Props",
		},
		{
			id: "variant",
			type: EditInputs.select,
			label: "Stack Variant Example",
			defaultValue: "default",
			required: true,
			options: ["default"],
		},
	],
};
