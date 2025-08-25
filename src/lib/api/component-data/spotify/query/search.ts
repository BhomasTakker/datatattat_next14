import {
	SearchParams,
	SearchResponse,
	SpotifySearchProps,
} from "@/types/api/spotify";
import { getSpotifyAccessToken } from "./get-access-token";

// config
const SPOTIFY_SEARCH_URL = "https://api.spotify.com/v1/search";

// you could make this a util
// if in given object add?
const createSearchUrl = ({
	q,
	type,
	market,
	limit,
	offset,
	include_external,
}: SearchParams) => {
	const fetchUrl = new URL(SPOTIFY_SEARCH_URL);
	fetchUrl.searchParams.append("q", q);
	fetchUrl.searchParams.append("type", type);
	if (market) fetchUrl.searchParams.append("market", market);
	if (limit) fetchUrl.searchParams.append("limit", limit.toString());
	if (offset) fetchUrl.searchParams.append("offset", offset.toString());
	if (include_external)
		fetchUrl.searchParams.append("include_external", include_external);
	return fetchUrl;
};

export const search = async (params: SpotifySearchProps) => {
	const accessToken = await getSpotifyAccessToken();

	if (!accessToken) {
		console.error("Failed to get access token");
		return [];
	}

	const fetchUrl = createSearchUrl(params);

	const response = await fetch(fetchUrl.toString(), {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!response.ok) {
		console.error("Failed to search spotify");
		return [];
	}

	const data = (await response.json()) as SearchResponse;
	const { episodes, ...rest } = data;
	const { href, next, limit, offset, previous, total, items = [] } = episodes;

	return items;
};
