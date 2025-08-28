import styles from "./audio-stack.module.scss";
import { AudioStackClientComponent } from "./audio-stack-client";
import { EpisodeItem } from "@/types/api/spotify";

export type AudioStackProps = {};

const renderMethod = (items: EpisodeItem[] = [], props: AudioStackProps) => {
	return <AudioStackClientComponent items={items} />;
};

const spotifyAudioStack = {
	styles,
	renderMethod,
};

export default spotifyAudioStack;
