import spotifyAudioStack from "./audio-stack/audio-stack";
import spotifyOembed from "./oembed/oembed";

// type is only different in the renderMethod - JSX.Element & JSX.Element[]
type Variants = typeof spotifyOembed | typeof spotifyAudioStack;

export enum SpotifyCollectionVariants {
	SpotifyOembed = "spotify-oembed",
	SpotifyAudioStack = "spotify-audio-stack",
}

export const VariantsMap = new Map<SpotifyCollectionVariants, Variants>([
	[SpotifyCollectionVariants.SpotifyOembed, spotifyOembed],
	[SpotifyCollectionVariants.SpotifyAudioStack, spotifyAudioStack],
]);
