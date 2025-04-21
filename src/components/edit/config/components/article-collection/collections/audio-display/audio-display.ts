import { AudioVerticalScrollerSize } from "@/components/content/components/article-collection/collections/audio-display/audio-display";
import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const AUDIO_DISPLAY: InputListProps = {
	id: "audoiDisplay",
	type: EditInputs.inputList,
	label: "Audio Display",
	inputs: [
		{
			id: "audioDisplayTitle",
			type: EditInputs.title,
			title: "Audio Display",
		},
		{
			id: "audioDisplayDescription",
			type: EditInputs.description,
			text: "This component displays a collection of audio tracks.",
		},
		{
			id: "size",
			type: EditInputs.select,
			label: "Audio Display Size",
			defaultValue: AudioVerticalScrollerSize.medium,
			required: true,
			options: [...Object.values(AudioVerticalScrollerSize)],
		},
	],
};
