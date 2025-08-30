import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";

const spotifyOembedInputs: GenericInput[] = [
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
];

export const SPOTIFY_OEMBED_CONFIG: GenericInput = {
	id: "spotifyOembedParams",
	type: EditInputs.inputList,
	label: "Spotify Oembed Parameters",
	createObject: false,

	inputs: spotifyOembedInputs,
};

const params: InputListProps = {
	id: "params",
	type: EditInputs.inputList,
	label: "SPOTIFY OEMBED QUERY",

	inputs: spotifyOembedInputs,
};

export const SPOTIFY_COLLECTION_OEMBED_CONFIG: InputListProps = {
	id: "spotifyOembedQuery",
	type: EditInputs.inputList,
	label: "SPOTIFY OEMBED QUERY",
	inputs: [
		{
			id: "parameters",
			type: EditInputs.title,
			title: "Oembed Query Parameters",
		},
		params,
	],
};
