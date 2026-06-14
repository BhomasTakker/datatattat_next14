import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const PAGE_CONFIG: InputListProps = {
	id: "page",
	type: EditInputs.inputList,
	label: "Page Object",
	createObject: false,
	inputs: [
		{
			id: "PagePropertiesTitle",
			type: EditInputs.title,
			title: "Page Properties",
		},
		{
			id: "route",
			type: EditInputs.text,
			label: "Route",
			disabled: true,
		},
		{
			id: "creator",
			type: EditInputs.text,
			label: "Creator",
			disabled: true,
		},
		{
			id: "live",
			type: EditInputs.switch,
			label: "Live",
			defaultChecked: false,
		},
		{
			id: "pageType",
			type: EditInputs.select,
			label: "Page Type",
			options: ["Content", "Landing", "User"],
		},
	],
};
