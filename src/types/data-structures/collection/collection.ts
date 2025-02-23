///// COLLECTION ///////
///// COLLECTION ITEM ///////

import { RSSImage, RSSItem } from "../rss";
import { BaseInfo, Details, Media, Pagination } from "./base";
import { CollectionItem, ProviderItem } from "./item/item";

export type Collection = BaseInfo & {
	////////////////////
	details?: Details;
	media?: Media;
	pagination?: Pagination;
	items: CollectionItem[];
};

type StrippedItem = {
	link: string;
};

// quick stopgap
export type RSSArticleCollection = {
	// remove string
	items: string[] | StrippedItem[] | RSSItem[];
	link?: string;
	title?: string;
	feed?: string;
	description?: string;
	lastBuildDate?: string;
	image?: RSSImage;
	provider?: ProviderItem;
};
