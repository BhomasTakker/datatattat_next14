import { search } from "./query/search";
import { fetchOembedList } from "@/lib/api/component-data/oembed/utils";
import { SpotifyVariant } from "./query/utils";
import { spotifyOembedByResponse } from "../oembed/options/spotify";
import { EpisodeItem, SearchParams } from "@/types/api/spotify";
import { spotifyConversion, oembedConversion } from "./conversions/episode";

type SpotifyFetchParams = {
	variant?: SpotifyVariant; // Type of query to perform
	feed?: string; // Feed URI
	actor?: string; // Author DID
	uri?: string; // Post URI
	cursor?: string; // Cursor for pagination
	limit?: number; // Number of posts to fetch
	depth?: number; // Depth of replies to fetch
	parentHeight?: number; // Height of the parent post
};

export const spotifyFetch = async (params: SpotifyFetchParams) => {
	const { variant = SpotifyVariant.Search, ...fetchParams } = params;

	let items: EpisodeItem[] = [];

	switch (variant) {
		case SpotifyVariant.Search:
			{
				items = await search(fetchParams as SearchParams);
			}
			break;
		default:
			items = [];
	}

	const { script, createUrl } = spotifyOembedByResponse;

	// create conversions function
	// provide spotify search conversion options
	const filteredItems = spotifyConversion(items);

	const results = await fetchOembedList(filteredItems, createUrl);

	// create conversions function
	// provide oembed conversion options
	const filteredResults = oembedConversion(results);

	return {
		items: filteredResults,
		script: script,
	};
};
