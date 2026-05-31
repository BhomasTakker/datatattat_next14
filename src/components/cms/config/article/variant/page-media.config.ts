import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const PAGE_MEDIA: InputListProps = {
	id: "pageVariant",
	type: EditInputs.inputList,
	label: "Page Configuration",
	createObject: false,
	inputs: [
		{
			id: "media",
			type: EditInputs.inputList,
			label: "Page Media",
			createObject: true,
			inputs: [
				{
					id: "MediaTitle",
					type: EditInputs.title,
					title: "Page Media",
					header: "h3",
				},
				{
					id: "type",
					type: EditInputs.select,
					label: "Media Type",
					required: true,
					options: ["Content", "User", "Landing"],
					defaultValue: "Content",
				},
			],
		},
	],
};
