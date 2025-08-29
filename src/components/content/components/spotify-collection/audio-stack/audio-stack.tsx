import styles from "./audio-stack.module.scss";
import { AudioStackClientComponent } from "./audio-stack-client";
import { SpotifyCollectionItem } from "./types";

export type AudioStackProps = {};

const renderMethod = (
	items: SpotifyCollectionItem[] = [],
	props: AudioStackProps
) => {
	return <AudioStackClientComponent items={items} />;
};

const spotifyAudioStack = {
	styles,
	renderMethod,
};

export default spotifyAudioStack;
