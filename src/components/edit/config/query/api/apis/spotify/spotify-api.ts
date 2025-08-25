import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";
import { SPOTIFY_SEARCH } from "./search";
import { SpotifyVariant } from "@/lib/api/component-data/spotify/query/utils";

const variantMap = new Map<SpotifyVariant, InputListProps>([
	[SpotifyVariant.Search, SPOTIFY_SEARCH],
]);

const PARAMS: GenericInput[] = [
	{
		id: "variant",
		type: EditInputs.objectSelect,
		label: "Select Type",
		required: true,
		options: [SpotifyVariant.Search],
		defaultValue: SpotifyVariant.Search,
		optionMap: variantMap,
	},
];

export const SPOTIFY_API_CONFIG: InputListProps = {
	id: "spotifyApi",
	type: EditInputs.inputList,
	label: "Spotify Search API",

	inputs: [
		{
			id: "SpotifyApiTitle",
			type: EditInputs.title,
			title: "Spotify Search API",
		},
		{
			id: "params",
			type: EditInputs.inputList,
			label: "API QUERY PARAMS",

			createObject: true,

			inputs: PARAMS,
		},
	],
};
