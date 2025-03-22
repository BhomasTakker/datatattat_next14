import { searchArticles } from "@/lib/mongo/actions/articles/search";
import { WithQuery } from "@/types/page";
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
		throw new Error("Invalid API provider");
	}

	const data = await api(params);

	// We should pronbably be going through conversions here
	// to make sure the data is in the right format
	return cloneDeep(data);
};
