import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";

export const AVATAR: GenericInput[] = [
	{
		id: "AvatarTitle",
		type: EditInputs.title,
		title: "Avatar",
		header: "h3",
	},
	{
		id: "avatar",
		type: EditInputs.inputList,
		label: "Avatar",
		createObject: true,
		inputs: [
			{
				id: "src",
				type: EditInputs.url,
				label: "Avatar Source URL",
				required: false,
			},
			{
				id: "alt",
				type: EditInputs.text,
				label: "Avatar Alt Text",
				required: false,
			},
		],
	},
];
