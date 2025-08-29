import { search } from "./query/search";
import { SpotifyVariant } from "./query/utils";
import { EpisodeItem, SpotifySearchProps } from "@/types/api/spotify";
import { spotifyConversion } from "./conversions/episode";

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

	const filteredItems = spotifyConversion(items, params) as EpisodeItem[];

	return {
		items: filteredItems,
	};
};
