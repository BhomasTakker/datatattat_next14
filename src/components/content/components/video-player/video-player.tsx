import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";
import "./video-player-style.css";
import styles from "./video-player.module.scss";

import { useEffect, useRef } from "react";
import Player from "video.js/dist/types/player";
import { PlayerOptions } from "./types";
import { applyPlayerOptions } from "./utils";

type VideoPlayerProps = {
	options: PlayerOptions;
	onReady: (player: any) => void;
};

/////////////////////////////////////////
// Understanding of this is pretty low
// Basic implementation of video player
/////////////////////////////////////////
export const VideoPlayer = ({ options, onReady }: VideoPlayerProps) => {
	const videoRef = useRef<HTMLDivElement>(null);
	const playerRef = useRef<Player>(null);

	useEffect(() => {
		// Make sure Video.js player is only initialized once
		if (!playerRef.current) {
			// The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
			const videoElement = document.createElement("video-js");

			if (!videoRef.current) {
				return;
			}

			videoRef.current.appendChild(videoElement);

			const player = (playerRef.current = videojs(videoElement, options, () => {
				onReady && onReady(player);
			}));

			// You could update an existing player in the `else` block here
			// on prop change, for example:
		} else {
			const player = playerRef.current;
			// applyPlayerOptions(player, options);
			player.options(options);
		}
	}, [options, videoRef]);

	// Dispose the Video.js player when the functional component unmounts
	useEffect(() => {
		const player = playerRef.current;

		return () => {
			if (player && !player.isDisposed()) {
				player.dispose();
				playerRef.current = null;
			}
		};
	}, [playerRef]);

	return (
		<div data-vjs-player>
			<div ref={videoRef} className={styles.player} />
		</div>
	);
};
