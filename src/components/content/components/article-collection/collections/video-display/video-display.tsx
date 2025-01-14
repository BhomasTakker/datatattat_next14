import { CollectionItem } from "@/types/data-structures/collection/item/item";
import styles from "./video-display.module.scss";
import { VideoDisplayComponent } from "./video-display-component";

const renderMethod = (articles: CollectionItem[]) => {
	if (!articles || articles.length === 0) return null;
	// Will be video component horizontal scroll or something
	return <VideoDisplayComponent articles={articles} />;
};

export const videoDisplay = {
	styles: styles,
	renderMethod: renderMethod,
};
