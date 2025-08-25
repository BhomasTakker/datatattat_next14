import { search } from "./query/search";
import { fetchOembedList } from "@/lib/api/component-data/oembed/utils";
import { SpotifyVariant } from "./query/utils";
import { spotifyOembedByResponse } from "../oembed/options/spotify";
import { EpisodeItem, SpotifySearchProps } from "@/types/api/spotify";
import { spotifyConversion, oembedConversion } from "./conversions/episode";

// Check this - we can get from somewhere
type SpotifyFetchParams = {
	variant?: SpotifyVariant; // Type of query to perform
} & SpotifySearchProps;

export const spotifyFetch = async (params: SpotifyFetchParams) => {
	const { variant = SpotifyVariant.Search, ...fetchParams } = params;

	let items: EpisodeItem[] = [];

	switch (variant) {
		case SpotifyVariant.Search:
			{
				items = await search(fetchParams);
			}
			break;
		default:
			items = [];
	}

	const { script, createUrl } = spotifyOembedByResponse;

	// create conversions function
	// provide spotify search conversion options
	const filteredItems = spotifyConversion(items, params);

	const results = await fetchOembedList(filteredItems, createUrl);

	// create conversions function
	// provide oembed conversion options
	const filteredResults = oembedConversion(results);

	return {
		items: filteredResults,
		script: script,
	};
};
