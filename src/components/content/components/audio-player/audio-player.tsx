"use client";

// https://www.youtube.com/watch?v=sqpg1qzJCGQ&list=PLrz61zkUHJJGLD5qlJSYfbm0Gh1Ri1Rt0&index=1
import styles from "./audio-player.module.scss";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdForward30 } from "react-icons/md";
import { MdReplay30 } from "react-icons/md";
import { MdVolumeUp } from "react-icons/md";
import { MdVolumeOff } from "react-icons/md";

import { useEffect, useRef, useState } from "react";

const formatTime = (rawSeconds: number) => {
	const seconds = Math.floor(rawSeconds % 60);
	const minutes = Math.floor((rawSeconds / 60) % 60);
	const hours = Math.floor(rawSeconds / 3600);

	const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
	const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const displayHours = hours < 10 ? `0${hours}` : hours;

	if (hours > 0) {
		return `${displayHours}:${displayMinutes}:${displaySeconds}`;
	}
	return `${displayMinutes}:${displaySeconds}`;
};

///////////////////////////////////////////
// Take in any audio player controls etc
// I guess if playlist etc
// but for now just a simple player
///////////////////////////////////////////
type AudioPlayerProps = {
	src: string;
	audioPlayerRef: React.RefObject<HTMLAudioElement | null>;
};

//////////////////////////////////
// far too large and complicated
// split and refactor
//////////////////////////////////
export const AudioPlayer = ({ src, audioPlayerRef }: AudioPlayerProps) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [volume, setVolume] = useState(50);
	const [duration, setDuration] = useState("00:00");
	const [currentTime, setCurrentTime] = useState("00:00");

	const progressBarRef = useRef<HTMLInputElement>(null);
	const volumeBarRef = useRef<HTMLInputElement>(null);
	const animationRef = useRef(0);

	const whilePlaying = () => {
		const audioPlayer = audioPlayerRef.current;
		if (!audioPlayer) return;
		progressBarRef.current!.value =
			audioPlayerRef.current!.currentTime.toString();
		setCurrentTime(formatTime(audioPlayerRef.current!.currentTime));
		animationRef.current = requestAnimationFrame(whilePlaying);

		const progressBar = progressBarRef.current;
		if (!progressBar) return;
		progressBar.style.setProperty(
			"--playback-width",
			`${(audioPlayer.currentTime / audioPlayer.duration) * 100}%`
		);
	};

	const togglePlayPause = () => {
		setIsPlaying((prev) => !prev);
		const audioPlayer = audioPlayerRef.current;
		if (isPlaying) {
			audioPlayer?.pause();
			cancelAnimationFrame(animationRef.current);
			return;
		}
		audioPlayer?.play();
		animationRef.current = requestAnimationFrame(whilePlaying);
	};

	const toggleMuted = () => {
		const audioPlayer = audioPlayerRef.current;
		if (!audioPlayer) return;
		setIsMuted((prev) => {
			audioPlayer.muted = !prev;
			return !prev;
		});
	};

	const forward30Handler = () => {
		progressBarRef.current!.value = (
			Number(progressBarRef.current!.value) + 30
		).toString();
		rangeChangeHandler();
	};
	const back30Handler = () => {
		progressBarRef.current!.value = (
			Number(progressBarRef.current!.value) - 30
		).toString();
		rangeChangeHandler();
	};

	const rangeChangeHandler = () => {
		const audioPlayer = audioPlayerRef.current;
		if (!audioPlayer) return;

		audioPlayer.currentTime = progressBarRef.current!.valueAsNumber;
		setCurrentTime(formatTime(audioPlayer.currentTime));

		const progressBar = progressBarRef.current;
		if (!progressBar) return;
		progressBar.style.setProperty(
			"--playback-width",
			`${(audioPlayer.currentTime / audioPlayer.duration) * 100}%`
		);
	};

	const volumneChangeHandler = () => {
		const audioPlayer = audioPlayerRef.current;
		if (!audioPlayer) return;

		const volumeBar = volumeBarRef.current;
		if (!volumeBar) return;
		audioPlayer.volume = volumeBar.valueAsNumber / 100;
		setVolume(volumeBar.valueAsNumber);

		volumeBar.style.setProperty(
			"--volume-width",
			`${volumeBar.valueAsNumber}%`
		);
	};

	useEffect(() => {
		const audioPlayer = audioPlayerRef.current;
		if (!audioPlayer) return;

		audioPlayer.volume = volume / 100;
		volumeBarRef.current!.value = volume.toString();
		volumeBarRef.current!.style.setProperty("--volume-width", `${volume}%`);
	}, []);

	useEffect(() => {
		const audioPlayer = audioPlayerRef.current;
		if (!audioPlayer) return;

		const duration = audioPlayer?.duration;
		if (!duration) return;

		setDuration(formatTime(audioPlayer?.duration));
		progressBarRef.current!.max = Math.floor(audioPlayer.duration).toString();
	}, [audioPlayerRef.current?.readyState, audioPlayerRef.current?.duration]);

	useEffect(() => {
		const audioPlayer = audioPlayerRef.current;
		if (!audioPlayer) return;

		const handlePlay = () => {
			animationRef.current = requestAnimationFrame(whilePlaying);
			setIsPlaying(true);
		};

		audioPlayer.addEventListener("play", handlePlay);

		return () => audioPlayer.removeEventListener("play", handlePlay);
	}, [isPlaying]);
	return (
		<div className={styles.audioPlayer}>
			<div className={styles.card}></div>
			<audio
				src={src}
				ref={audioPlayerRef}
				preload="meta"
				// controls
			/>
			<div className={styles.progressBarContainer}>
				<input
					ref={progressBarRef}
					onChange={rangeChangeHandler}
					type="range"
					min="0"
					className={styles.progressBar}
					defaultValue={0}
				/>
			</div>

			<div className={styles.controls}>
				<div className={styles.playerControls}>
					<Button onClick={back30Handler}>
						<MdReplay30 />
					</Button>
					<Button onClick={togglePlayPause}>
						{isPlaying ? <FaPause /> : <FaPlay />}
					</Button>
					<Button onClick={forward30Handler}>
						<MdForward30 />
					</Button>
				</div>
				<div className={styles.controlsSecondary}>
					<div className={styles.speakerContainer}>
						<Button classes={styles.volumeButton} onClick={toggleMuted}>
							{isMuted || volume === 0 ? <MdVolumeOff /> : <MdVolumeUp />}
						</Button>

						<Button classes={styles.volumeBg}>
							<input
								type="range"
								ref={volumeBarRef}
								className={styles.volume}
								min="0"
								max="100"
								defaultValue={0}
								onChange={volumneChangeHandler}
							/>
						</Button>
					</div>
					<Button classes={styles.timeBg}>
						<div className={styles.time}>{`${currentTime} / ${duration}`}</div>
					</Button>
				</div>
			</div>
		</div>
	);
};
