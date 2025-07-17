import { PlayerSourceTypes } from "@/components/content/components/article-collection/collections/video-display/structs";
import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";

export const PARAMS: GenericInput[] = [
	{
		id: "parameters",
		type: EditInputs.title,
		title: "HTML Meta Query Parameters",
	},
	{
		id: "sources",
		type: EditInputs.array,
		label: "Add Source Objects",
		title: "Sources",
		createObject: true,
		// We need to allow an object 'shape'
		// This just saves an array and not an array of objects
		input: {
			id: "source",
			type: EditInputs.inputList,
			label: "Display Player Source",
			createObject: false,
			inputs: [
				{
					id: "src",
					type: EditInputs.text,
					label: "Video Source URL",
					// placeholder: 'Enter the video source URL',
					required: true,
					// defaultValue: 'https://www.youtube.com/watch?v=example', // Example URL
				},
				{
					id: "type",
					// Why can't we set the labels independently of values!
					type: EditInputs.select,
					label: "Source Type",
					defaultValue: PlayerSourceTypes.Youtube,
					required: false,
					options: [
						// PlayerSourceTypes.Default,
						PlayerSourceTypes.Youtube,
						// PlayerSourceTypes.Vimeo,
						PlayerSourceTypes.Mp4,
					],
				},
				{
					id: "poster",
					type: EditInputs.text,
					label: "Poster Image URL",
					// placeholder: "Enter the poster image URL (optional)",
					required: false,
					defaultValue: "", // Optional poster image URL
				},
				{
					id: "title",
					type: EditInputs.text,
					label: "Video Title",
					// placeholder: "Enter the video title (optional)",
					required: false,
					defaultValue: "", // Optional video title
				},
				{
					id: "description",
					type: EditInputs.text,
					label: "Video Description",
					// placeholder: "Enter the video description (optional)",
					required: false,
					defaultValue: "", // Optional video description
				},
			],
		},
	},
];
