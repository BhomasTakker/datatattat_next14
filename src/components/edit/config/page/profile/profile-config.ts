import { InputListProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../../inputs/inputs";

export const PROFILE_CONFIG: InputListProps = {
	id: "profile",
	type: EditInputs.inputList,
	label: "Profile Object",

	inputs: [
		{
			id: "profilePropertiesTitle",
			type: EditInputs.title,
			title: "Page Properties",
		},
		{
			id: "showPageTitle",
			type: EditInputs.show,
			label: "Show Page Title",

			inputs: [
				{
					id: "pageTitle",
					type: EditInputs.text,
					label: "Page Title",
				},
			],
		},
	],
};
