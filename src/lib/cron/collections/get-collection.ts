// i.e. then add anything we need?
// So i.e. we could effectively - if we stored under unique time
// have a record of what was on the homepage at any given time

import { saveOrCreateArticleCollectionByFeed } from "@/lib/mongo/actions/articleCollection";
import { connectToMongoDB } from "@/lib/mongo/db";
import { RSSArticleCollection } from "@/types/data-structures/collection/collection";
import { RSSImage, RSSItem } from "@/types/data-structures/rss";
import { UnknownObject } from "@/types/utils";

export type DataResponse = {
	items: RSSItem[];
	link?: string;
	title?: string;
	feed?: string;
	description?: string;
	lastBuildDate?: string;
	language?: string;
	webMaster?: string;
	pubDate?: string;
	generator?: string;
	image?: RSSImage;
	ttl?: string;
} & UnknownObject;

// except not quite because it is rss
const convertRssToCollection = (rssData: DataResponse) => {
	const { items, link, title, feed, description, lastBuildDate, image } =
		rssData;
	const strippedItems = items.map((item) => item.link);
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

export const getCollection = async (
	url: string,
	rssFeed: DataResponse
): Promise<RSSArticleCollection> => {
	await connectToMongoDB();
	// above is convert rss to collection
	const { feed, ...rest } = convertRssToCollection(rssFeed);

	// console.log("feed", feed);

	console.log("load collection", { url });

	// updtateOrCreatesaveOrCreateArticleBySrc
	const { message, result } = await saveOrCreateArticleCollectionByFeed({
		...rest,
		feed: url,
	});

	console.log("loaded collection", { message, url });

	return Promise.resolve(result);
};
