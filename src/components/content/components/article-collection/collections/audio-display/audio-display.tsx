import { UnknownObject } from "@/types/utils";
import { ArticleRenderProps } from "../types";
import styles from "./audio-display.module.scss";
import { AudioDisplayComponent } from "./audio-display-component";
import { AudioPlayerArticles, AudioPlayerTemplate } from "./template";

export const AudioVerticalScrollerSize = {
	large: "large",
	medium: "medium",
	small: "small",
} as const;

export type AudioDisplayOptions = {
	size?: (typeof AudioVerticalScrollerSize)[keyof typeof AudioVerticalScrollerSize];
};

// we need the option of showing duration etc
// meta component should be more dynamic
// just show data - but of a type

const renderMethod = (
	articles: ArticleRenderProps[] = [],
	options: UnknownObject & AudioDisplayOptions
) => {
	if (!articles || articles.length === 0) return null;

	return <AudioDisplayComponent articles={articles} {...options} />;
};

// We should use options to determine size etc of template
const renderTemplate = (options: UnknownObject & AudioDisplayOptions) => {
	return (
		<div className={styles.root}>
			<AudioPlayerTemplate />
			<AudioPlayerArticles />
		</div>
	);
};

export const audioDisplay = {
	styles: styles,
	renderMethod: renderMethod,
	renderTemplate: renderTemplate,
};
