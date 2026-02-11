"use client";

// https://www.youtube.com/watch?v=sqpg1qzJCGQ&list=PLrz61zkUHJJGLD5qlJSYfbm0Gh1Ri1Rt0&index=1
import styles from "./audio-player.module.scss";

import ReactH5AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";
import "video.js/dist/video-js.css";
import "videojs-youtube";

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

// Can be used for different renders.
// We were using a video player for .m3u8
const renderPlayer = ({ src, variant }: RendeProps) => {
	switch (true) {
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
					customProgressBarSection={[
						RHAP_UI.CURRENT_TIME,
						RHAP_UI.PROGRESS_BAR,
					]}
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
