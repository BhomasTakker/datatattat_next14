import { UnknownObject } from "@/types/utils";
import { ArticleRenderProps } from "../types";
import styles from "./audio-display.module.scss";
import { AudioDisplayComponent } from "./audio-display-component";

export type AudioDisplayOptions = {};

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

export const audioDisplay = {
	styles: styles,
	renderMethod: renderMethod,
};
