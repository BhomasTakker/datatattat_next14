import Player from "video.js/dist/types/player";
import { PlayerOptions } from "./types";

// Probably do something better than this
// Just to avoid dupe code
export const applyPlayerOptions = (player: Player, options: PlayerOptions) => {
	const {
		autoplay,
		aspectRatio,
		controls,
		fill,
		fluid,
		responsive,
		poster,
		audioPosterMode,
		playbackRates,
		width,
		height,
		preload,
		techOrder,
		sources,
	} = options;

	player.fill(fill);
	player.controls(controls);
	player.aspectRatio(aspectRatio);
	player.autoplay(autoplay);
	player.poster(poster);

	// if (options.autoplay) {
	// 	player.play();
	// }
};
