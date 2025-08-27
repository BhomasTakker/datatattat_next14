import spotifyOembed from "./oembed/oembed";

// type is only different in the renderMethod - JSX.Element & JSX.Element[]
type Variants = typeof spotifyOembed;

export enum SpotifyCollectionVariants {
	SpotifyOembed = "spotify-oembed",
}

export const VariantsMap = new Map<SpotifyCollectionVariants, Variants>([
	[SpotifyCollectionVariants.SpotifyOembed, spotifyOembed],
]);
