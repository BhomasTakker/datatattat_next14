import { RSSItem } from "@/types/data-structures/rss";
import { getArticle } from "./get-article";
import { ExtraData } from "../types";
import { ProviderItem } from "@/types/data-structures/collection/item/item";
import { UnknownObject } from "@/types/utils";

type Items = RSSItem[];

export type FetchArticles = {
	items: Items;
	extraData?: ExtraData;
	provider?: ProviderItem;
	collectionData?: UnknownObject;
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
