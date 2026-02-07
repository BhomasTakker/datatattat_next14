import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";

export const MEDIA: GenericInput[] = [
	{
		id: "MediaTitle",
		type: EditInputs.title,
		title: "Media",
		header: "h3",
	},
	{
		id: "media",
		type: EditInputs.inputList,
		label: "Media",
		createObject: true,
		inputs: [
			{
				id: "mediaType",
				type: EditInputs.text,
				label: "Media Type",
				required: false,
			},
			{
				id: "type",
				type: EditInputs.text,
				label: "Type",
				required: false,
			},
			{
				id: "format",
				type: EditInputs.text,
				label: "Format",
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
				label: "Collection Title",
				required: false,
			},
			{
				id: "rating",
				type: EditInputs.number,
				label: "Rating",
				min: 0,
				required: false,
			},
			{
				id: "views",
				type: EditInputs.number,
				label: "Views",
				min: 0,
				required: false,
			},
		],
	},
];
