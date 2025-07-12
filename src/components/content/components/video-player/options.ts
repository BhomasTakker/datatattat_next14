import { PlayerOptions } from "./types";

export const BASE_PLAYER_OPTIONS: PlayerOptions = {
	autoplay: false,
	aspectRatio: "16:9",
	controls: true,
	fill: true,
	fluid: true,
	responsive: true,
	poster: "",
	playbackRates: [0.5, 1, 1.5, 2],
	width: undefined,
	height: undefined,
	preload: "auto",
	techOrder: ["html5", "youtube"],
	sources: [],
	audioOnlyMode: false,
	audioPosterMode: false,
};
