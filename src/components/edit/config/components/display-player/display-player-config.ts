import { PlayerSourceTypes } from "@/components/content/components/article-collection/collections/video-display/structs";
import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const DISPLAY_PLAYER_CONFIG: InputListProps = {
	id: "displayPlayerComponent",
	type: EditInputs.inputList,
	label: "Display Player Component",
	inputs: [
		{
			id: "displayPlayerComponentTitle",
			type: EditInputs.title,
			title: "Display Player Component",
		},
		{
			id: "sourceType",
			type: EditInputs.select,
			label: "Video Source Type",
			defaultValue: PlayerSourceTypes.Youtube,
			required: true,
			options: [
				PlayerSourceTypes.Youtube,
				// PlayerSourceTypes.Vimeo,
				PlayerSourceTypes.Mp4,
			],
		},
		{
			id: "src",
			type: EditInputs.text,
			label: "Video Source URL",
			// placeholder: 'Enter the video source URL',
			required: true,
			// defaultValue: 'https://www.youtube.com/watch?v=example', // Example URL
		},
		{
			id: "poster",
			type: EditInputs.text,
			label: "Poster Image URL",
			// placeholder: "Enter the poster image URL (optional)",
			required: false,
			defaultValue: "", // Optional poster image URL
		},
		// Update with - something like filling out a playlist
		// getWithConfig({ options: [QueryOptions.NONE, QueryOptions.OEMBED] }),
	],
};
