import { Collection } from "@/types/data-structures/collection/collection";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { RSSChannelType, RSSItem } from "@/types/data-structures/rss";

import { map } from "rxjs";
import { determineItemType } from "./utils";
import { createCollectionItem } from "./collection-items";

// Go over the structure of this object
// From Rss - which we should store?
// To ArticleCollection
const toCollection = () => {
	// should set collection type here
	return map((data: RSSChannelType): Collection => {
		const { title, items, link, description } = data;
		return {
			title,
			src: link,
			description,
			guid: "",
			variant: "article",
			items: items as unknown as CollectionItem[],
			pagination: {
				results: items?.length || 0,
			},
		};
	});
};

// but then this and all conversions become promises
// This should probably get the meta data for each article
// Then form the data into a collection item
const toCollectionItem = () => {
	return map((data: RSSItem): CollectionItem => {
		const itemType = determineItemType(data);
		const item = createCollectionItem(data, itemType);

		return item;
	});
};

export const TRANSFORM = new Map<string, object>([
	["toCollection", toCollection],
	["toCollectionItem", toCollectionItem],
]);

export const SORT = new Map<string, object>([]);

export const FILTER = new Map<string, object>([]);

//RSS 2.0 Conversions
export const RSS_2_0_CONVERSIONS = new Map<string, Map<string, object>>([
	["TRANSFORM", TRANSFORM],
	["FILTER", FILTER],
	["SORT", SORT],
]);
