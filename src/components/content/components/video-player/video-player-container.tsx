import videojs from "video.js";

import { RefObject } from "react";
import { VideoPlayer } from "./video-player";
import { StyleSheet } from "@/types/css";
import Player from "video.js/dist/types/player";

import styles from "./video-player.module.scss";
import { PlayerOptions } from "./types";
import { applyPlayerOptions } from "./utils";

type VideoPlayerProps = {
	styles: StyleSheet;
	playerRef: RefObject<Player | null>;
	options: PlayerOptions;
};

// https://videojs.com/guides/options/
// audioOnlyMode && audioPosterMode for podcasts?

//https://blog.stackademic.com/how-to-develop-a-powerful-video-player-in-react-using-video-js-a-complete-guide-cb43682a1c84

export const VideoPlayerContainer = ({
	playerRef,
	options,
}: VideoPlayerProps) => {
	const handlePlayerReady = (player: Player) => {
		playerRef.current = player;

		applyPlayerOptions(player, options);

		if (options.autoplay) {
			player.play();
		}

		// You can handle player events here, for example:
		player.on("dispose", () => {
			videojs.log("player will dispose");
		});
	};

	return (
		<div className={styles.root}>
			<VideoPlayer options={options} onReady={handlePlayerReady} />
		</div>
	);
};
