import { InputListProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../../inputs/inputs";
import { SpotifyCollectionVariants } from "@/components/content/components/spotify-collection/variant-map";
import { SPOTIFY_OEMBED_CONFIG } from "./collections/oembed";

type spotifyCollectionProps = typeof SPOTIFY_OEMBED_CONFIG;

const collectionsMap = new Map<string, spotifyCollectionProps>([
	[SpotifyCollectionVariants.SpotifyOembed, SPOTIFY_OEMBED_CONFIG],
]);

// there may be a better way
// Also utils this
const options = Array.from(collectionsMap.keys()).map((key) => key);

export const SPOTIFY_COLLECTION_CONFIG: InputListProps = {
	id: "spotifyCollection",
	type: EditInputs.inputList,
	label: "Spotify Collection",

	inputs: [
		{
			id: "spotifyCollectionTitle",
			type: EditInputs.title,
			title: "Spotify Collection",
		},
		{
			id: "variantType",
			type: EditInputs.objectSelect,
			label: "Spotify Collection Variant",
			defaultValue: SpotifyCollectionVariants.SpotifyOembed,
			required: true,
			options,
			optionMap: collectionsMap,
			// we are saved on comopnent props object - our parent
			optionId: undefined, // "variantProps",
		},
	],
};
