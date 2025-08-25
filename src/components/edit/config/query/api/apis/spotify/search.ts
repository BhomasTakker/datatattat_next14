import { EditInputs } from "@/components/edit/inputs/inputs";
import {
	SearchTypes,
	SpotifySearchResultsSortOptions,
} from "@/types/api/spotify";
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
		{
			id: "q",
			type: EditInputs.text,
			label: "Search query",
		},
		{
			id: "type",
			type: EditInputs.select,
			label: "Search type",
			options: [
				SearchTypes.Album,
				SearchTypes.Artist,
				SearchTypes.Episode,
				SearchTypes.Playlist,
				SearchTypes.Show,
				SearchTypes.Track,
				SearchTypes.Audiobook,
			],
		},
		{
			id: "market",
			type: EditInputs.text,
			label: "Market",
			required: false,
		},
		{
			id: "limit",
			type: EditInputs.number,
			label: "Limit",
			required: false,
			min: 1,
			max: 50,
		},
		{
			id: "offset",
			type: EditInputs.number,
			label: "Offset",
			required: false,
		},
		{
			id: "include_external",
			type: EditInputs.select,
			label: "Include external",
			options: ["audio"],
			required: false,
		},
		// Conversions for filter
		{
			id: "sort",
			type: EditInputs.select,
			label: "Sort by",
			options: [
				SpotifySearchResultsSortOptions.relevance,
				SpotifySearchResultsSortOptions.created_date,
				SpotifySearchResultsSortOptions.duration,
			],
			defaultValue: SpotifySearchResultsSortOptions.relevance,
			required: true,
		},
	],
};
