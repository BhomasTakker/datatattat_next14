import { OEmbed } from "@/types/data-structures/oembed";
import styles from "./oembed.module.scss";
import { SpotifyOembedComponent } from "./spotify-oembed-component";
import { ContainerHeightOptions } from "@/components/page/components/stack/types";

export type OembedStackProps = {
	height: ContainerHeightOptions;
};

type SpotifyOembed = {
	iframe_url: string;
} & OEmbed;

const renderMethod = (items: SpotifyOembed[] = [], props: OembedStackProps) => {
	const [item] = items;

	return <SpotifyOembedComponent item={item} height={props.height} />;
};

const spotifyOembed = {
	styles,
	renderMethod,
};

export default spotifyOembed;
