import { OEmbed } from "@/types/data-structures/oembed";
import styles from "./oembed.module.scss";
import { SpotifyOembedComponent } from "./spotify-oembed-component";
import { ContainerHeightOptions } from "@/components/page/components/stack/types";
import { UnknownObject } from "@/types/utils";

export type OembedStackProps = {
	height: ContainerHeightOptions;
};

type SpotifyOembed = {
	iframe_url: string;
} & OEmbed;

const renderMethod = (items: SpotifyOembed[] = [], options: UnknownObject) => {
	const { height = ContainerHeightOptions.MD } = options as OembedStackProps;
	const [item] = items;

	return <SpotifyOembedComponent item={item} height={height} />;
};

const renderTemplate = (options: UnknownObject) => {
	return (
		<div className={styles.oembedPlaceholder}>Spotify OEmbed Template</div>
	);
};

const spotifyOembed = {
	styles,
	renderMethod,
	renderTemplate,
};

export default spotifyOembed;
