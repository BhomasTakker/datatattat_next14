import { EditInputs } from "@/components/edit/inputs/inputs";
import {
	SearchTypes,
	SpotifySearchResultsSortOptions,
} from "@/types/api/spotify";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const NUMERIC_SORT_CONFIG: InputListProps = {
	id: "numeric_sort",
	type: EditInputs.inputList,
	// label: "Released Date",
	inputs: [
		{
			id: "direction",
			type: EditInputs.select,
			label: "Sort Direction",
			options: ["ascending", "descending"],
		},
	],
};

const sortMap = new Map<string, InputListProps | null>([
	[SpotifySearchResultsSortOptions.relevance, null],
	[SpotifySearchResultsSortOptions.released, NUMERIC_SORT_CONFIG],
	[SpotifySearchResultsSortOptions.duration, NUMERIC_SORT_CONFIG],
]);

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
			type: EditInputs.objectSelect,
			label: "Sort by",
			optionMap: sortMap,
			options: [...sortMap.keys()],
			defaultValue: SpotifySearchResultsSortOptions.relevance,
			required: true,
			// optionId: "sort",
		},
	],
};
