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

	////////////////////////////////////////////////
	// we need to fetch meta for x number of items - n should be variable
	// We could pass it as part of the query
	// return some data i.e. time - including the src for the rest
	// We probably should just send a meta loaded var?
	// Then in Article meta wrapper we can check and load if we have to
	// While also using InView to lazy load the article itself
	////////////////////////////////////////////////
	const data = items.map(async (item, i) => {
		if (item?.meta) {
			// console.log("META ITEM", item);
		}

		if (!item?.meta) {
			item.meta = undefined;
			// we don't need to wait for this
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
