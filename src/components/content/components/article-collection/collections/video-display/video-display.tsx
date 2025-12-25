import styles from "./video-display.module.scss";
import { VideoDisplayComponent } from "./video-display-component";
import { PlayerCollectionVariant, PlayerSourceTypes } from "./structs";
import { UnknownObject } from "@/types/utils";
import { ArticleRenderProps } from "../types";
import { articleTemplate } from "../utils";

export type VideoDisplayOptions = {
	variant: PlayerCollectionVariant;
	sourceType: PlayerSourceTypes;
	autoplay: boolean;
};

const renderMethod = (
	articles: ArticleRenderProps[] = [],
	// would you say UnknownObject AND this?
	options: UnknownObject & VideoDisplayOptions
) => {
	if (!articles || articles.length === 0) return null;

	// Will be video component horizontal scroll or something
	// pass in variant and component props
	return <VideoDisplayComponent articles={articles} {...options} />;
};

const renderTemplate = (options: UnknownObject & VideoDisplayOptions) => {
	{
		const { variant } = options;
		const containerClassName = `container${variant}`;
		// We shoould use this
		const containerClass = styles[containerClassName];
		return (
			<div className={styles.template}>
				<div className={styles.videoPlayer}>
					<div className={styles.videoPlayer}></div>
				</div>

				<ul className={styles.articles}>
					{Array.from({ length: 10 }).map((_, index) => (
						<li key={index} className={styles.article} />
					))}
				</ul>
			</div>
		);
	}
};

export const videoDisplay = {
	styles: styles,
	renderMethod: renderMethod,
	renderTemplate: renderTemplate,
};
