///// COLLECTION ///////
///// COLLECTION ITEM ///////

import { RSSImage } from "../rss";
import { BaseInfo, Details, Media, Pagination } from "./base";
import { CollectionItem } from "./item/item";

export type Collection = BaseInfo & {
	////////////////////
	details?: Details;
	media?: Media;
	pagination?: Pagination;
	items: CollectionItem[];
};

// quick stopgap
export type RSSArticleCollection = {
	items: string[];
	link?: string;
	title?: string;
	feed?: string;
	description?: string;
	lastBuildDate?: string;
	image?: RSSImage;
};
