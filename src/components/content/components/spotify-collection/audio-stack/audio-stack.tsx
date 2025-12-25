import styles from "./audio-stack.module.scss";
import { AudioStackClientComponent } from "./audio-stack-client";
import { SpotifyCollectionItem } from "./types";
import { ContainerHeightOptions } from "@/components/page/components/stack/types";
import { UnknownObject } from "@/types/utils";
import { articleTemplate } from "../../article-collection/collections/utils";

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
		<div className={styles.root}>
			<div className={styles.template} />
			<div className={styles.articles}>
				{Array.from({ length: 10 }).map((_, index) => (
					<div key={index} className={styles.articleTemplate} />
				))}
			</div>
		</div>
	);
};

const spotifyAudioStack = {
	styles,
	renderMethod,
	renderTemplate,
};

export default spotifyAudioStack;
