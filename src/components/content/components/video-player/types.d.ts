export type Autoplay = boolean | "play" | "muted" | "any" | undefined;

// if undefined will default to whatever video.js defaults are
export type PlayerOptions = {
	autoplay?: Autoplay;
	aspectRatio: string;
	controls?: boolean;
	fill?: boolean;
	// enableDocumentPictureInPicture: boolean;
	fluid?: boolean;
	responsive?: boolean;
	poster: string;
	playbackRates?: number[];
	width?: number;
	height?: number;
	preload?: string;
	techOrder: string[];
	sources: {
		src: string;
		type: string;
	}[];
	// youtube: {
	//   iv_load_policy: number;
	// };
	audioOnlyMode?: boolean;
	audioPosterMode?: boolean;
};
