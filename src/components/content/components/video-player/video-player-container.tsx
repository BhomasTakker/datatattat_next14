"use client";

import videojs from "video.js";

import { RefObject, useRef } from "react";
import { VideoPlayer } from "./video-player";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { StyleSheet } from "@/types/css";
import Player from "video.js/dist/types/player";

import styles from "./video-player.module.scss";
import { preload } from "react-dom";

type VideoPlayerProps = {
	item: CollectionItem;
	styles: StyleSheet;
	src: string;
	playerRef: RefObject<Player | null>;
};

// https://videojs.com/guides/options/
// audioOnlyMode && audioPosterMode for podcasts?

//https://blog.stackademic.com/how-to-develop-a-powerful-video-player-in-react-using-video-js-a-complete-guide-cb43682a1c84

export const VideoPlayerContainer = ({
	item,
	src,
	playerRef,
}: VideoPlayerProps) => {
	// const playerRef = useRef<Player>(null);

	const videoJsOptions = {
		// gtrue isn't necessarily correct!
		autoplay: "any",
		controls: true,
		fill: true,
		enableDocumentPictureInPicture: true,
		// responsive: true,
		fluid: true,
		// fill: true,
		// aspexctRatio: "16:9",
		playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],

		// We won't do width and height
		// We will fill and size the container i.e. root
		width: 640,
		height: 480,
		preload: "auto",
		// I guess provide source? vimeo in here
		// what about mp4 etc do we have to say?
		techOrder: ["youtube", "html5"],
		sources: [
			{
				src,
				type: "video/youtube",
			},
		],
		youtube: { iv_load_policy: 2 },
		// plugins: {
		// 	youtube: {},
		// },
	};

	const handlePlayerReady = (player: Player) => {
		playerRef.current = player;

		player.fill(true);
		player.controls(true);
		player.fluid(true);
		player.responsive(true);
		player.aspectRatio("16:9");
		player.autoplay("any");

		console.log("PLAYER ", { player });
		// player.preload("auto");
		// player.Youtube({});

		if (videoJsOptions.autoplay) {
			console.log("PLAYER autoplaying");
			player.play()?.then(() => {
				console.log("PLAYER played");
			});
		}

		player.src({
			src,
			type: "video/youtube",
		});

		// player.responsive(true);
		// player.aspectRatio("16:9");
		// player.autoplay(true);
		videojs.log("container player ready", { player });
		console.log("container player ready console.log");

		// You can handle player events here, for example:
		player.on("waiting", () => {
			videojs.log("player is waiting");
		});

		player.on("dispose", () => {
			videojs.log("player will dispose");
		});
	};

	return (
		<div className={styles.root}>
			<VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
		</div>
	);
};
