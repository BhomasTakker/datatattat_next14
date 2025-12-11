import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

// RADIO MEDIA - is different to podcast
// based on mediaType we can show different fields
export const AUDIO_MEDIA: InputListProps = {
	id: "audioVariant",
	type: EditInputs.inputList,
	label: "Audio Configuration",
	createObject: false,
	inputs: [
		{
			id: "MediaTitle",
			type: EditInputs.title,
			title: "Audio Media",
			header: "h3",
		},
		{
			id: "type",
			type: EditInputs.text,
			label: "Type",
			required: false,
		},
		{
			id: "mediaType",
			type: EditInputs.text,
			label: "Media Type",
			required: false,
		},
		{
			id: "duration",
			type: EditInputs.number,
			label: "Duration (in seconds)",
			min: 0,
			required: false,
		},
		{
			id: "collectionTitle",
			type: EditInputs.text,
			label: "Media Collection Title",
			required: false,
		},
	],
};
