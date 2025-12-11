import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";

export const MANAGEMENT: GenericInput[] = [
	{
		id: "ManagementTitle",
		type: EditInputs.title,
		title: "Management",
		header: "h3",
	},
	{
		id: "disabled",
		type: EditInputs.switch,
		label: "Disabled",
		defaultChecked: false,
	},
	// {
	// 	id: "ttl",
	// 	type: EditInputs.number,
	// 	label: "TTL (Time-to-live in seconds)",
	// 	min: 0,
	// 	required: false,
	// },
];
