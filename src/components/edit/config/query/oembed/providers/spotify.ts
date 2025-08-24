import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";

export const SPOTIFY_OEMBED_CONFIG: GenericInput = {
	id: "spotifyOembedParams",
	type: EditInputs.inputList,
	label: "Spotify Oembed Parameters",
	createObject: false,

	inputs: [
		{
			id: "asset",
			type: EditInputs.select,
			label: "Spotify Asset",
			defaultValue: "episode",
			options: ["album", "artist", "show", "episode", "playlist", "track"],
		},
		{
			id: "contentId",
			type: EditInputs.text,
			label: "Content ID",
			validation: {
				required: true,
				minLength: 22,
				maxLength: 22, // Spotify content IDs are typically 22 characters long
			},
		},
	],
};
