import { search, SearchParams } from "./query/search";
import { fetchOembedList } from "@/lib/api/component-data/oembed/utils";
import { OEmbed } from "@/types/data-structures/oembed";
import { SpotifyVariant } from "./query/utils";
import { spotifyOembedByResponse } from "../oembed/options/spotify";

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

	let items: any[] = [];

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
	const results = await fetchOembedList(items, createUrl);

	const filteredResults = results.filter((item) => {
		if (!item) return false;

		// For spotify we can filter out video
		// video embeds are a different size etc
		if (item.type === "video") return false;

		return true;
	}) as OEmbed[];

	return {
		items: filteredResults,
		script: script,
	};
};
