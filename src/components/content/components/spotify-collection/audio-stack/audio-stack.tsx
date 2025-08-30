import styles from "./audio-stack.module.scss";
import { AudioStackClientComponent } from "./audio-stack-client";
import { SpotifyCollectionItem } from "./types";
import { ContainerHeightOptions } from "@/components/page/components/stack/types";

export type AudioStackProps = {
	height: ContainerHeightOptions;
};

const renderMethod = (
	items: SpotifyCollectionItem[] = [],
	props: AudioStackProps
) => {
	return <AudioStackClientComponent items={items} height={props.height} />;
};

const spotifyAudioStack = {
	styles,
	renderMethod,
};

export default spotifyAudioStack;
