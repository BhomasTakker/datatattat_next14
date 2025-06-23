import { searchArticles } from "@/lib/mongo/actions/articles/search";
import { WithQuery } from "@/types/component";
import { cloneDeep } from "@/utils/object";
import { youtubeApiFetch } from "../google/youtube/youtube-api";

type APIOptions = typeof searchArticles | typeof youtubeApiFetch | null;

const apiMap = new Map<string, APIOptions>([
	["none", null],
	["articles-search-api", searchArticles],
	["youtube-api", youtubeApiFetch],
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

	const data = await api(params);

	return cloneDeep(data);
};
