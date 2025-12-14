import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const FETCH_CRON_CONFIG: InputListProps = {
	id: "cron-jobs",
	type: EditInputs.inputList,
	label: "Profile Object",
	createObject: false,

	inputs: [
		{
			id: "profilePropertiesTitle",
			type: EditInputs.title,
			title: "Fetch Cron Jobs Settings",
		},
		{
			id: "id",
			type: EditInputs.text,
			label: "Get by ID",
			required: false,
		},
		{
			id: "_id",
			type: EditInputs.text,
			label: "Get by Object ID",
			required: false,
		},
	],
};
