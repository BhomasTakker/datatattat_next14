import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const VIDEO_MEDIA: InputListProps = {
	id: "videoVariant",
	type: EditInputs.inputList,
	label: "Video Configuration",
	createObject: false,
	inputs: [
		{
			id: "MediaTitle",
			type: EditInputs.title,
			title: "Video Media",
			header: "h3",
		},
		{
			id: "format",
			type: EditInputs.text,
			label: "Media Format",
			required: false,
		},
		{
			id: "rating",
			type: EditInputs.number,
			label: "Media Rating",
			min: 0,
			required: false,
		},
		{
			id: "views",
			type: EditInputs.number,
			label: "Media Views",
			min: 0,
			required: false,
		},
	],
};
