import { RSSArticleCollection } from "@/types/data-structures/collection/collection";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { fetchRss } from "../rss/fetch-rss";
import { Service, ServiceState } from "../service";
import { getCollection } from "./get-collection";
import { fetchArticles } from "../articles/fetch-articles";

// Pass in the collections object
export const fetchCollections = async (urls: string[]) => {
	const service = Service.getInstance();
	const state = service.getState();

	if (state === ServiceState.ready) {
		service.setState(ServiceState.running);
		return await fetchRss<(CollectionItem | null)[], RSSArticleCollection>({
			urls,
			callback: () => {
				service.setState(ServiceState.ready);
			},
			itemsCallback: fetchArticles,
			// @ts-expect-error - whatever
			feedCallback: getCollection,
		});
	}
};
