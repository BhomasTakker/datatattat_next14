import styles from "./audio-stack.module.scss";
import { AudioStackClientComponent } from "./audio-stack-client";
import { SpotifyCollectionItem } from "./types";
import { ContainerHeightOptions } from "@/components/page/components/stack/types";
import { UnknownObject } from "@/types/utils";
import {
	AudioPlayerArticles,
	AudioPlayerTemplate,
} from "../../article-collection/collections/audio-display/template";

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

// Pretty much same component as article audio template
// create a component
const renderTemplate = (options: UnknownObject) => {
	return (
		<div className={styles.template}>
			<AudioPlayerTemplate />
			<AudioPlayerArticles />
		</div>
	);
};

const spotifyAudioStack = {
	styles,
	renderMethod,
	renderTemplate,
};

export default spotifyAudioStack;
