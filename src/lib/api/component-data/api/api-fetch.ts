import { searchArticles } from "@/lib/mongo/actions/articles/search";
import { WithQuery } from "@/types/component";
import { cloneDeep } from "@/utils/object";
import { youtubeApiFetch } from "../google/youtube/youtube-api";
import { blueSkyFetch } from "@/lib/bluesky/query";
import { spotifyFetch } from "../spotify";

type APIOptions =
	| typeof searchArticles
	| typeof youtubeApiFetch
	| typeof blueSkyFetch
	| typeof spotifyFetch
	| null;

const apiMap = new Map<string, APIOptions>([
	["none", null],
	["articles-search-api", searchArticles],
	["youtube-api", youtubeApiFetch],
	["bluesky-api", blueSkyFetch],
	["spotify-api", spotifyFetch],
]);

// We need to specify a cache time for the data
export const apiFetch = async (query: WithQuery) => {
	// query should have a second passed object as standard
	// containing cache time etc - & we should have a default
	const { params, provider } = query;

	const api = apiMap.get(provider);
	if (!api) {
		console.error("Invalid API provider:", provider);
		return {
			error: "Invalid API provider",
			items: [],
		};
	}

	// typing here is wrong
	// we are unable to set required params
	// so technically we arent this OR this OR this
	// we are this AND this AND this....
	// @ts-expect-error - type is incorrect but wrong to do this....
	const data = await api(params);

	return cloneDeep(data);
};
