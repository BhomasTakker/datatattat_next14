"use client";

import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { VideoPlayerContainer } from "../../../video-player/video-player-container";
import { Interaction } from "../../article/interaction/interactions";
import { InteractionsOptions } from "../../article/interaction/interactions-map";

import styles from "./video-display.module.scss";
import { useRef } from "react";
import Player from "video.js/dist/types/player";
import {
	PlayerAutoplayOptions,
	PlayerCollectionVariant,
	PlayerSourceTypes,
} from "./structs";
import { InViewComponent } from "@/components/ui/in-view/in-view";
import { articleMetaLoader, articleRenderer, articleTemplate } from "../utils";
import { WithData } from "@/components/ui/with-data/with-data";

type VideoDisplayComponentProps = {
	articles: CollectionItem[];

	variant: PlayerCollectionVariant;
	sourceType: PlayerSourceTypes;
	autoplay: boolean;
};

export const VideoDisplayComponent = ({
	articles = [],
	variant,
	sourceType, // use youtube as an id and then do whatever required for each option
	autoplay,
}: VideoDisplayComponentProps) => {
	const playerRef = useRef<Player>(null);
	const firstArticle = articles[0];
	const src = firstArticle.src;
	const template = articleTemplate(styles);

	// These in a separate file
	// We will ultimately need to pass or reference sourcetype
	// based on item as we may want variant sources in the same collection
	const onClickHnd = (item: CollectionItem) => {
		const video = playerRef.current;
		if (!video) {
			return;
		}
		// This works to effectively reset the error - if there is an error
		// @ts-expect-error null works but flags error / undefine ddoes not work...
		video.error(null);
		video.autoplay(true);
		video.src({
			src: item.src,
			type: sourceType,
		});
		video.poster(item.avatar?.src);
	};

	const options = {
		autoplay: autoplay ? PlayerAutoplayOptions.Any : false,
		aspectRatio: "16:9",
		controls: true,
		// width: 640,
		// height: 480,
		fill: true,
		fluid: true,
		responsive: true,

		playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
		preload: "auto",
		techOrder: ["youtube", "html5"],
		poster: firstArticle.avatar?.src || "",
		sources: [
			{
				src,
				type: sourceType,
			},
		],
	};

	const containerClassName = `container${variant}`;
	const containerClass = styles[containerClassName];

	// We want to create the video initialisation object here?
	// If we are passing in event handlers then we may well want to

	return (
		// class variant
		<div className={containerClass}>
			<div className={styles.videoPlayer}>
				<VideoPlayerContainer
					styles={styles}
					playerRef={playerRef}
					options={options}
				/>
			</div>
			<ul className={styles.articles}>
				{articles.map((item) => (
					<li key={item.src}>
						<InViewComponent
							options={{
								threshold: 0,
								triggerOnce: true,
							}}
							template={<div className={styles.template} />}
						>
							{/* Should be part of a 'wider' Article Component  */}
							<Interaction
								key={item.title}
								type={InteractionsOptions.Click}
								onClick={() => onClickHnd(item)}
							>
								<WithData
									getter={articleMetaLoader(item)}
									callback={articleRenderer(styles)}
									template={template}
								/>
							</Interaction>
						</InViewComponent>
					</li>
				))}
			</ul>
		</div>
	);
};
