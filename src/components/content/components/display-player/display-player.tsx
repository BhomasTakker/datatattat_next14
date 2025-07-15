"use client";

import { ComponentProps } from "@/types/component";
import { VideoPlayerContainer } from "../video-player/video-player-container";
import styles from "./display-player.module.scss";
import { useRef } from "react";
import Player from "video.js/dist/types/player";
import { PlayerSourceTypes } from "../article-collection/collections/video-display/structs";
import { BASE_PLAYER_OPTIONS } from "../video-player/options";

type VideoDisplayComponentProps = {
	options: DisplayPlayerDataObject;
};

type DisplayPlayerDataObject = {
	src: string;
	sourceType?: PlayerSourceTypes;
	audioOnlyMode?: boolean; // Optional, true if audio only mode
	poster?: string; // Optional poster image URL
};

export const VideoDisplayComponent = ({
	options,
}: VideoDisplayComponentProps) => {
	const playerRef = useRef<Player>(null);
	const { src, sourceType, poster, audioOnlyMode } = options;

	const videoPlayerOptions = {
		...BASE_PLAYER_OPTIONS,
		poster: poster || "", // Use provided poster or [provide fallback]
		audioOnlyMode,
		sources: [
			{
				src: src || "",
				type: sourceType || undefined,
			},
		],
	};

	return (
		<div className={styles.root} data-testid="display-player">
			<VideoPlayerContainer
				styles={styles}
				playerRef={playerRef}
				// @ts-ignore clean up
				options={videoPlayerOptions}
			/>
		</div>
	);
};

export const DisplayPlayer = ({ component, dataObject }: ComponentProps) => {
	const {
		src = "",
		sourceType,
		poster,
		audioOnlyMode,
	} = component.componentProps as Partial<DisplayPlayerDataObject>;

	return (
		<VideoDisplayComponent
			options={{ src, sourceType, poster, audioOnlyMode }}
		/>
	);
};
