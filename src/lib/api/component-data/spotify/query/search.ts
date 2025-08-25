import { SearchParams, SearchResponse } from "@/types/api/spotify";
import { getSpotifyAccessToken } from "./get-access-token";

// we need to provide a sort
// potentially filter
// the spotify api is pretty lame for filtering etc

export const search = async (params: SearchParams) => {
	// console.log("Searching spotify with params:", params);
	const {
		q,
		type,
		market,
		limit: searchLimit,
		offset: searchOffset,
		include_external,
	} = params;
	const accessToken = await getSpotifyAccessToken();

	if (!accessToken) {
		console.error("Failed to get access token");
		return [];
	}

	const response = await fetch(
		`https://api.spotify.com/v1/search?q=${q}&type=${type}`,
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

	const data = (await response.json()) as SearchResponse;
	const { episodes, ...rest } = data;
	const { href, next, limit, offset, previous, total, items = [] } = episodes;

	return items;
};
