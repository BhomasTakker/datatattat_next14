import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const FETCH_SOURCES_CONFIG: InputListProps = {
	id: "sources",
	type: EditInputs.inputList,
	label: "Fetch Sources Object",
	createObject: false,

	inputs: [
		{
			id: "fetchSourcesTitle",
			type: EditInputs.title,
			title: "Fetch Sources Settings",
		},
		{
			id: "name",
			type: EditInputs.text,
			label: "Get by Name",
			required: false,
		},
		{
			id: "src",
			type: EditInputs.text,
			label: "Get by Source URL",
			required: false,
		},
		{
			id: "id",
			type: EditInputs.text,
			label: "Get by ID",
			required: false,
		},
		// Add region, coverage, etc
	],
};
