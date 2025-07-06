import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const PAGE_GRID_CONFIG: InputListProps = {
	id: "grid",
	type: EditInputs.inputList,
	label: "Page Grid",

	inputs: [
		{
			id: "variant",
			type: EditInputs.select,
			label: "Grid Variant",
			options: [""],
		},
	],
};
