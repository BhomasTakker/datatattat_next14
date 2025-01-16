import {
	PlayerCollectionVariant,
	PlayerSourceTypes,
} from "@/components/content/components/article-collection/collections/video-display/structs";
import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

// We may need video source

export const VIDEO_DISPLAY: InputListProps = {
	id: "videoDisplay",
	type: EditInputs.inputList,
	label: "Video Display",
	inputs: [
		{
			id: "videoDisplayTitle",
			type: EditInputs.title,
			title: "Video Display",
		},
		{
			id: "videoDisplayDescription",
			type: EditInputs.description,
			text: "This component displays a collection of videos in a vertical or horizontal scroll. Please note currently only youtube videos are available.",
		},
		{
			id: "variant",
			type: EditInputs.select,
			label: "Video Display Variant",
			defaultValue: PlayerCollectionVariant.VerticalScroll,
			required: true,
			options: [
				PlayerCollectionVariant.VerticalScroll,
				PlayerCollectionVariant.HorizontalScroll,
			],
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
				// PlayerSourceTypes.Mp4,
			],
		},
		{
			id: "autoplay",
			type: EditInputs.switch,
			label: "Autoplay",
			defaultChecked: false,
			// defaultValue: false,
		},
	],
};
