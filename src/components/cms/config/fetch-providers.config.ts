import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const FETCH_PROVIDERS_CONFIG: InputListProps = {
	id: "providers",
	type: EditInputs.inputList,
	label: "Profile Object",
	createObject: false,

	inputs: [
		{
			id: "name",
			type: EditInputs.text,
			label: "Name",
			required: false,
		},
	],
};
