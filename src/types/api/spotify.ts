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
	id: string;
	type: SearchType;
	title: string;
	description: string;
	thumbnail: string;
};

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
