import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";
import { getWithConfig, QueryOptions } from "../../../query/_with-config";
import { APIOptions } from "../../../query/api/api-base-config";
import { useContainerHeight } from "../../../shared/content";
import { ContainerHeightOptions } from "@/components/page/components/stack/types";

export const SPOTIFY_AUDIO_STACK_CONFIG: InputListProps = {
	id: "spotifyAudioStack",
	type: EditInputs.inputList,
	label: "Spotify Audio Stack",
	inputs: [
		{
			id: "audioStackComponentTitle",
			type: EditInputs.title,
			title: "Spotify Audio Stack Component",
		},
		useContainerHeight("height", "Spotify Oembed Height", [
			ContainerHeightOptions.SM,
			ContainerHeightOptions.MD,
			ContainerHeightOptions.LG,
		]),
		getWithConfig({
			options: [
				// we need to  add this after we determine variant
				QueryOptions.API_QUERY,
			],
			defaultSelection: QueryOptions.API_QUERY,
			apiConfigOptions: {
				options: [APIOptions.SPOTIFY_API],
				defaultSelection: APIOptions.SPOTIFY_API,
			},
		}),
	],
};
