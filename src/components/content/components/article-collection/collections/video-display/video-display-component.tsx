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
import { BASE_PLAYER_OPTIONS } from "../../../video-player/options";

type VideoDisplayComponentProps = {
	articles: CollectionItem[];

	variant: PlayerCollectionVariant;
	sourceType: PlayerSourceTypes;
	autoplay: boolean;
};

const sourceTypeMap = new Map([
	["youtube", PlayerSourceTypes.Youtube],
	["mp4", PlayerSourceTypes.Mp4],
	["", PlayerSourceTypes.Default],
]);

// should be a stop gap until we can trust the given data from Article source
// This all is currently a big dog clean it up
const determineSourceType = (
	item: CollectionItem,
	fallback: PlayerSourceTypes
) => {
	// Return empty string for 'default' / built in options
	const { media } = item;
	if (media && media.format === PlayerSourceTypes.Default) {
		return PlayerSourceTypes.Default;
	}

	// if no media return OUR stated (component wide) default OR youtube <- should be PlayerSourceTypes.Default
	// and should rename defaultType to something else
	if (!media || !media.format) {
		return typeof fallback === "string" ? fallback : PlayerSourceTypes.Youtube;
	}

	// if item format === PlayerSourceType return
	const options = [PlayerSourceTypes.Youtube, PlayerSourceTypes.Mp4];
	if (media.format && options.includes(media.format as PlayerSourceTypes)) {
		return media.format as PlayerSourceTypes;
	}

	// check map and return if match else return fallback || PlayerSourceTypes.Youtube;
	const mappedType = sourceTypeMap.get(media.format);
	return mappedType || fallback || PlayerSourceTypes.Youtube;
};

export const VideoDisplayComponent = ({
	articles = [],
	variant,
	sourceType, // use youtube as an id and then do whatever required for each option
	autoplay,
}: VideoDisplayComponentProps) => {
	const playerRef = useRef<Player>(null);
	if (!articles || articles.length === 0) {
		return null;
	}
	const firstArticle = articles[0];
	const src = firstArticle?.src;
	const template = articleTemplate(styles);

	if (!firstArticle) {
		return null;
	}

	// These in a separate file
	// We will ultimately need to pass or reference sourcetype
	// based on item as we may want variant sources in the same collection
	const onClickHnd = (item: CollectionItem) => {
		const video = playerRef.current;
		if (!video) {
			return;
		}

		// This works to effectively reset the error - if there is an error
		// @ts-expect-error null works but flags error / undefined does not work...
		video.error(null);
		video.autoplay(true);
		video.src({
			src: item.src,
			// take from item or use sourceType / so we can multiple sources
			type: determineSourceType(item, sourceType),
		});
		video.poster(item.avatar?.src);
	};

	const options = {
		...BASE_PLAYER_OPTIONS,
		autoplay: autoplay ? PlayerAutoplayOptions.Any : false,
		poster: firstArticle.avatar?.src || "",
		sources: [
			{
				src,
				type: determineSourceType(firstArticle, sourceType),
			},
		],
	};

	const containerClassName = `container${variant}`;
	const containerClass = styles[containerClassName];

	// We want to create the video initialisation object here?
	// If we are passing in event handlers then we may well want to
	return (
		// class variant
		<div className={containerClass} data-testid={variant}>
			<div className={styles.videoPlayer} data-testid="video-player-container">
				<VideoPlayerContainer
					styles={styles}
					playerRef={playerRef}
					options={options}
				/>
			</div>
			<ul className={styles.articles} data-testid="articles-list">
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
