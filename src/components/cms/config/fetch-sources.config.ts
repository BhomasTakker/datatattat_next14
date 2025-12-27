import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const FETCH_SOURCES_CONFIG: InputListProps = {
	id: "sources",
	type: EditInputs.inputList,
	label: "Fetch Sources Object",
	createObject: false,

	inputs: [
		{
			id: "name",
			type: EditInputs.text,
			label: "Get by Name",
			required: false,
		},
		// Add region, coverage, etc
	],
};
