import { RSSItem } from "@/types/data-structures/rss";
import { getArticle } from "./get-article";
import { ExtraData } from "../types";
import { ProviderItem } from "@/types/data-structures/collection/item/item";

type Items = RSSItem[];

export type FetchArticles = {
	items: Items;
	extraData?: ExtraData;
	provider?: ProviderItem;
};

export const fetchArticles = async ({
	items,
	extraData,
	provider,
}: FetchArticles) => {
	const data = items.map((item, i) => {
		return getArticle({ item, extraData, provider });
	});

	return Promise.all(data);
};
