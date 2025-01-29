"use server";

import { fetchWithCache } from "@/lib/redis/redis-fetch";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { getArticle } from "../data/article/get-article";

export const getClientMeta = async (item: CollectionItem) => {
	const data = await fetchWithCache(() => getArticle(item), item.src);
	return data;
};
