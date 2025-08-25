import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const SPOTIFY_SEARCH: InputListProps = {
	id: "spotifySearch",
	type: EditInputs.inputList,
	label: "Spotify Search API",

	inputs: [
		{
			id: "SpotifySearchTitle",
			type: EditInputs.title,
			title: "Spotify Search API",
		},
	],
};
