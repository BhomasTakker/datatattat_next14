import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const FETCH_PROVIDERS_CONFIG: InputListProps = {
	id: "providers",
	type: EditInputs.inputList,
	label: "Profile Object",
	createObject: false,

	inputs: [
		{
			id: "profilePropertiesTitle",
			type: EditInputs.title,
			title: "Fetch Providers Settings",
		},
		{
			id: "name",
			type: EditInputs.text,
			label: "Get by Name",
			required: false,
		},
		{
			id: "url",
			type: EditInputs.text,
			label: "Get by URL",
			required: false,
		},
		{
			id: "id",
			type: EditInputs.text,
			label: "Get by ID",
			required: false,
		},
	],
};
