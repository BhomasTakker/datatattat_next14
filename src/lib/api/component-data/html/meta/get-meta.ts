import { getArticle } from "@/actions/data/article/get-article";
import { saveOrUpdateArticle } from "@/actions/data/article/save-article";
import { fetchWithCache } from "@/lib/redis/redis-fetch";
import { CollectionItem } from "@/types/data-structures/collection/item/item";

type MetaItem = {
	meta?: boolean;
} & CollectionItem;
// This here isn't fetchMeta
// It is more fetch/save items
// should probably pass in return function
export const fetchMeta = async (items: MetaItem[] = [], limit: number) => {
	if (!items || !items?.map) {
		return Promise.resolve([]);
	}

	const data = items.map(async (item, i) => {
		if (!item?.meta) {
			item.meta = undefined;
			saveOrUpdateArticle(item);
			return Promise.resolve(item);
		}
		if (i > limit) {
			// not liking the loadData thing / would be load meta anyway
			// or meta true/false etc
			return Promise.resolve({ ...item, loadData: true });
		}
		return fetchWithCache(() => getArticle(item), item.src);
	});

	return Promise.all(data);
};
