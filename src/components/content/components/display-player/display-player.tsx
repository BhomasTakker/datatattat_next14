"use client";

import { ComponentProps } from "@/types/component";
import { VideoPlayerContainer } from "../video-player/video-player-container";
import styles from "./display-player.module.scss";
import { useRef } from "react";
import Player from "video.js/dist/types/player";
import { PlayerSourceTypes } from "../article-collection/collections/video-display/structs";
import { BASE_PLAYER_OPTIONS } from "../video-player/options";

type DisplayPlayerDataObject = {
	src: string;
	sourceType: PlayerSourceTypes;
	poster?: string; // Optional poster image URL
};

export const DisplayPlayer = ({ component, dataObject }: ComponentProps) => {
	const { src, sourceType, poster } =
		component.componentProps as Partial<DisplayPlayerDataObject>;
	const playerRef = useRef<Player>(null);

	const options = {
		...BASE_PLAYER_OPTIONS,
		poster: poster || "", // Use provided poster or [provide fallback]
		sources: [
			{
				src: src || "",
				type: sourceType as string,
			},
		],
	};

	return (
		<div className={styles.root} data-testid="display-player">
			<VideoPlayerContainer
				styles={styles}
				playerRef={playerRef}
				options={options}
			/>
		</div>
	);
};
