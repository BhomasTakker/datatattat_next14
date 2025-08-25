export enum SearchTypes {
	Album = "album",
	Artist = "artist",
	Playlist = "playlist",
	Track = "track",
	Show = "show",
	Episode = "episode",
	Audiobook = "audiobook",
}

export type SearchType =
	| SearchTypes.Album
	| SearchTypes.Artist
	| SearchTypes.Playlist
	| SearchTypes.Track
	| SearchTypes.Show
	| SearchTypes.Episode
	| SearchTypes.Audiobook;

export type SearchParams = {
	q: string;
	type: SearchType;
	market?: string;
	limit?: number;
	offset?: number;
	include_external?: "audio";
};

export type EpisodeItem = {
	// audio_preview_url: string; deprecated
	description: string;
	html_description: string;
	duration_ms: number;
	explicit: boolean;
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: {
		url: string;
		width: number;
		height: number;
	}[];
	isExternallyHosted: boolean;
	is_playable: boolean;
	languages: string[];
	name: string;
	release_date: string;
	release_date_precision: "day" | "month" | "year";
	resume_point: {
		fully_played: boolean;
		resume_position_ms: number;
	};
	type: SearchType;
	uri: string;
	restrictions: {
		reason: "market" | "product" | "explicit";
	};
};

// can be Episode, Track, Playlist, Search etc
export type SearchResponse = {
	episodes: {
		href: string;
		next: string;
		limit: number;
		offset: number;
		previous: string | null;
		total: number;
		items: EpisodeItem[];
	};
};
