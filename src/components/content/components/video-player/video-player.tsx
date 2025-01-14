"use client";

import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";
import "./video-player-style.css";
import styles from "./video-player.module.scss";
// not sure if this is needed
// import "videojs-youtube/dist/Youtube.js";

import { useEffect, useRef } from "react";
import Player from "video.js/dist/types/player";

// Potentially we just need to create our own type
type Options = {};

type VideoPlayerProps = {
	options: Options;
	onReady: (player: any) => void;
};

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

			// videoElement.classList.add("vjs-big-play-centered");
			videoRef.current.appendChild(videoElement);

			const player = (playerRef.current = videojs(videoElement, options, () => {
				videojs.log("player is ready");
				onReady && onReady(player);
			}));

			// player.removeClass("vjs-loading-spinner");

			// You could update an existing player in the `else` block here
			// on prop change, for example:
		} else {
			const player = playerRef.current;
			// did not appear to work........
			// player.removeClass("vjs-loading-spinner");
			// player.autoplay(options.autoplay);
			// player.src(options.sources);
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

	console.log("Video Player");
	return (
		<div data-vjs-player>
			<div ref={videoRef} className={styles.player} />
		</div>
	);
};

// Probematic for sme reason
export const VideoPlayer2 = ({ options, onReady }: VideoPlayerProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const playerRef = useRef<Player>(null);

	useEffect(() => {
		if (videoRef.current) {
			playerRef.current = videojs(videoRef.current, options, () => {
				onReady(playerRef.current);
			});
		}
		return () => {
			if (playerRef.current) {
				playerRef.current.dispose();
			}
		};
	}, [options, playerRef]);
	return (
		<div>
			<div data-vjs-player>
				<video ref={videoRef} className="video-js vjs-default-skin"></video>
			</div>
		</div>
	);
};
