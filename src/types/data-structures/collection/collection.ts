///// COLLECTION ///////
///// COLLECTION ITEM ///////

import { BaseInfo, Details, Media, Pagination } from "./base";
import { CollectionItem } from "./item/item";

export type Collection = BaseInfo & {
	////////////////////
	details?: Details;
	media?: Media;
	pagination?: Pagination;
	items: CollectionItem[];
};
