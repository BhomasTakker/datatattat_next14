"use client";

// https://www.youtube.com/watch?v=sqpg1qzJCGQ&list=PLrz61zkUHJJGLD5qlJSYfbm0Gh1Ri1Rt0&index=1
import styles from "./audio-player.module.scss";

import ReactH5AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";
import "video.js/dist/video-js.css";
import "videojs-youtube";

import H5AudioPlayer from "react-h5-audio-player";
import { VideoDisplayComponent } from "../display-player/display-player";

///////////////////////////////////////////
// Take in any audio player controls etc
// I guess if playlist etc
// but for now just a simple player
///////////////////////////////////////////
type AudioPlayerProps = {
	src: string;
	variant?: "default" | "radio" | string;
};

type RendeProps = {
	src: string;
	variant?: "default" | "radio" | string;
};

// A bit of a hack - we need a better solution
const renderPlayer = ({ src, variant }: RendeProps) => {
	switch (true) {
		case src.endsWith(".m3u8"):
			return (
				<VideoDisplayComponent
					key={src}
					options={{ src, poster: "", audioOnlyMode: true }}
				/>
			);
		case variant === "radio":
			return (
				<ReactH5AudioPlayer
					src={src}
					showJumpControls={false}
					layout="horizontal-reverse"
					customControlsSection={[
						RHAP_UI.MAIN_CONTROLS,
						RHAP_UI.VOLUME_CONTROLS,
					]}
					autoPlayAfterSrcChange={true}
					// showDownloadProgress={false}
					showFilledVolume={true}
					// defaultDuration={null}
				/>
			);
		default:
			return (
				<ReactH5AudioPlayer
					src={src}
					layout="horizontal-reverse"
					autoPlayAfterSrcChange={false}
					// showDownloadProgress={false}
					showFilledVolume={true}
					defaultDuration={null}
				/>
			);
	}
};

export const AudioPlayer = ({ src, variant }: AudioPlayerProps) => {
	return (
		<div className={styles.audioPlayer}>{renderPlayer({ src, variant })}</div>
	);
};
