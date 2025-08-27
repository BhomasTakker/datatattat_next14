import { OEmbed } from "@/types/data-structures/oembed";
import styles from "./oembed.module.scss";
import { SpotifyOembedComponent } from "./spotify-oembed-component";

export type OembedStackProps = {};

type SpotifyOembed = {
	iframe_url: string;
} & OEmbed;

const renderMethod = (items: SpotifyOembed[] = [], props: OembedStackProps) => {
	const [item] = items;

	return <SpotifyOembedComponent item={item} />;
};

const spotifyOembed = {
	styles,
	renderMethod,
};

export default spotifyOembed;
