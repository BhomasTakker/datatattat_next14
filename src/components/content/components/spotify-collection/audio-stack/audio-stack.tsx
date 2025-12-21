import styles from "./audio-stack.module.scss";
import { AudioStackClientComponent } from "./audio-stack-client";
import { SpotifyCollectionItem } from "./types";
import { ContainerHeightOptions } from "@/components/page/components/stack/types";
import { UnknownObject } from "@/types/utils";

export type AudioStackProps = {
	height: ContainerHeightOptions;
};

const renderMethod = (
	items: SpotifyCollectionItem[] = [],
	options: UnknownObject
) => {
	const { height } = options as AudioStackProps;
	return <AudioStackClientComponent items={items} height={height} />;
};

const renderTemplate = (options: UnknownObject) => {
	return (
		<div className={styles.oembedPlaceholder}>Spotify Audio Stack Template</div>
	);
};

const spotifyAudioStack = {
	styles,
	renderMethod,
	renderTemplate,
};

export default spotifyAudioStack;
