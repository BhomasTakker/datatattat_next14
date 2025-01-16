"use client";

import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { VideoPlayerContainer } from "../../../video-player/video-player-container";
import { Article } from "../../article/article";
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

	// We will ultimately need to pass or reference sourcetype
	// based on item as we may want variant sources in the same collection
	const onClickHnd = (item: CollectionItem) => {
		const video = playerRef.current;
		if (!video) {
			return;
		}
		video.src({
			src: item.src,
			type: sourceType,
		});
		video.poster(item.avatar?.src);
		// in case no autoplay
		// Let's say we play on click for now
		video.play();
	};

	const options = {
		// autoplay: PlayerAutoplayOptions.Any,
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
					<li key={item.title}>
						<Interaction
							key={item.title}
							type={InteractionsOptions.Click}
							onClick={() => onClickHnd(item)}
						>
							<Article article={item} styles={styles} />
						</Interaction>
					</li>
				))}
			</ul>
		</div>
	);
};
