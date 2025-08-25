import { get } from "http";
import { getSpotifyAccessToken } from "./get-access-token";

export type SearchParams = {
	q: string;
};

export type EpisodeItem = {
	id: string;
	type: string;
	title: string;
	description: string;
	thumbnail: string;
};

type SearchResponse = {
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

export const search = async (params: SearchParams) => {
	// console.log("Searching spotify with params:", params);
	const accessToken = await getSpotifyAccessToken();

	if (!accessToken) {
		console.error("Failed to get access token");
		return [];
	}

	console.log("Access token:", accessToken);

	const response = await fetch(
		`https://api.spotify.com/v1/search?q=${params.q || "Ukraine"}&type=episode`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	if (!response.ok) {
		console.error("Failed to search spotify");
		return [];
	}

	// console.log("Search response:", response);

	const data = (await response.json()) as SearchResponse;
	const { episodes, ...rest } = data;
	const { href, next, limit, offset, previous, total, items = [] } = episodes;
	// console.log("Search response:", rest, episodes);
	return items;
};
