import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const PAGE_GRID_CONFIG: InputListProps = {
	id: "grid",
	type: EditInputs.inputList,
	label: "Page Grid",

	inputs: [
		{
			id: "pageGridTitle",
			type: EditInputs.title,
			title: "Grid Props",
		},
		{
			id: "variant",
			type: EditInputs.select,
			label: "Grid Variant Example",
			defaultValue: "default",
			required: true,
			options: ["default"],
		},
	],
};
