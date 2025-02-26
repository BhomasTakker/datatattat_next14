import { DataResponse, RSSChannelType } from "@/types/data-structures/rss";

import { GetCollection } from "./types";
import { RSSArticleCollection } from "@/types/data-structures/collection/collection";
import {
	saveOrCreateArticleCollectionByFeed,
	saveOrCreateArticleCollectionByFeed2,
} from "@/lib/mongo/actions/articleCollection";

// i.e. then add anything we need?
// So i.e. we could effectively - if we stored under unique time
// have a record of what was on the homepage at any given time
// except not quite because it is rss
const convertRssToCollection = (rssData: DataResponse) => {
	const {
		items = [],
		link,
		title,
		feed,
		description,
		lastBuildDate,
		image,
	} = rssData || {};
	const strippedItems = items.map((item) => ({ link: item.link }));

	return {
		items: strippedItems,
		link,
		title,
		feed,
		description,
		lastBuildDate,
		image,
	};
};

export const getCollection = async ({
	url,
	rssFeed,
	extraData,
	provider,
}: GetCollection): Promise<RSSArticleCollection | null> => {
	const { feed, ...rest } = convertRssToCollection(rssFeed);

	// Need mush categories etc together

	try {
		const { message, result } = await saveOrCreateArticleCollectionByFeed2({
			...rest,
			...extraData,
			provider,
			feed: url,
		});

		return Promise.resolve(result as unknown as RSSArticleCollection);
	} catch (e) {
		console.log(e);
		return Promise.resolve(null);
	}
};

// simple fix - should be set at the 'url' data level
export const getYoutubeCollection = async ({
	url,
	rssFeed,
	extraData,
	provider,
}: GetCollection): Promise<RSSArticleCollection | null> => {
	try {
		const { message, result } = await saveOrCreateArticleCollectionByFeed2({
			...rssFeed,
			...extraData,
			provider,
			feed: url,
		});

		return Promise.resolve(result as unknown as RSSArticleCollection);
	} catch (err) {
		console.log(err);
		return Promise.resolve(null);
	}
};
