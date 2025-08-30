import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";
import { getWithConfig, QueryOptions } from "../../../query/_with-config";
import { useContainerHeight } from "../../../shared/content";
import { ContainerHeightOptions } from "@/components/page/components/stack/types";

export const SPOTIFY_OEMBED_CONFIG: InputListProps = {
	id: "spotifyOembed",
	type: EditInputs.inputList,
	label: "Spotify Oembed",
	inputs: [
		{
			id: "oembedComponentTitle",
			type: EditInputs.title,
			title: "Spotify Oembed Component",
		},
		useContainerHeight("height", "Spotify Oembed Height", [
			ContainerHeightOptions.SM,
			ContainerHeightOptions.MD,
			ContainerHeightOptions.LG,
		]),
		getWithConfig({
			options: [
				// we need to  add this after we determine variant
				QueryOptions.SPOTIFY_OEMBED,
			],
			defaultSelection: QueryOptions.SPOTIFY_OEMBED,
		}),
	],
};
