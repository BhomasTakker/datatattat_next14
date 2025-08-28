import { OEmbed } from "@/types/data-structures/oembed";
import styles from "./audio-stack.module.scss";

export type OembedStackProps = {};

type SpotifyOembed = {
	iframe_url: string;
} & OEmbed;

const renderMethod = (items: SpotifyOembed[] = [], props: OembedStackProps) => {
	console.log("AUIO:STACK", { items, props });

	return <div>Spotify Audio Stack</div>;
};

const spotifyAudioStack = {
	styles,
	renderMethod,
};

export default spotifyAudioStack;
