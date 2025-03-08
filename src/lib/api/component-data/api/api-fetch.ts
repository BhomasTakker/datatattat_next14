import { searchArticles } from "@/lib/mongo/actions/articles/search";
import { WithQuery } from "@/types/page";
import { cloneDeep } from "@/utils/object";

const apiMap = new Map([
	["none", null],
	["articles-search-api", searchArticles],
]);

export const apiFetch = async (query: WithQuery) => {
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
