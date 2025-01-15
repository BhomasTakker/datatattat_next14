import { CollectionItem } from "@/types/data-structures/collection/item/item";
import styles from "./video-display.module.scss";
import { VideoDisplayComponent } from "./video-display-component";
import { PlayerCollectionVariant, PlayerSourceTypes } from "./structs";

const renderMethod = (articles: CollectionItem[]) => {
	if (!articles || articles.length === 0) return null;

	const props = {
		variant: PlayerCollectionVariant.VerticalScroll,
		sourceType: PlayerSourceTypes.Youtube,
	};
	// Will be video component horizontal scroll or something
	// pass in variant and component props
	return <VideoDisplayComponent articles={articles} {...props} />;
};

export const videoDisplay = {
	styles: styles,
	renderMethod: renderMethod,
};
