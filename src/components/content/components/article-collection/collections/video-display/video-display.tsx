import styles from "./video-display.module.scss";
import { VideoDisplayComponent } from "./video-display-component";
import { PlayerCollectionVariant, PlayerSourceTypes } from "./structs";
import { UnknownObject } from "@/types/utils";
import { ArticleRenderProps } from "../types";

export type VideoDisplayOptions = {
	variant: PlayerCollectionVariant;
	sourceType: PlayerSourceTypes;
	autoplay: boolean;
};

const renderMethod = (
	articles: ArticleRenderProps[],
	// would you say UnknownObject AND this?
	options: UnknownObject & VideoDisplayOptions
) => {
	if (!articles || articles.length === 0) return null;

	// Will be video component horizontal scroll or something
	// pass in variant and component props
	return <VideoDisplayComponent articles={articles} {...options} />;
};

export const videoDisplay = {
	styles: styles,
	renderMethod: renderMethod,
};
