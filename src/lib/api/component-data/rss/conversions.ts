import { Collection } from "@/types/data-structures/collection/collection";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { RSSChannelType, RSSItem } from "@/types/data-structures/rss";

import { map } from "rxjs";

const toCollection = () => {
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

const toCollectionItem = () => {
	return map((data: RSSItem): CollectionItem => {
		const {
			title,
			// content potentially more likely to have html
			content,
			description,
			author,
			category,
			link,
			pubDate,
			enclosure,
		} = data;
		const { url = "" } = enclosure || {};

		return {
			title: title,
			src: link,
			description: content || description,
			guid: "",
			variant: "article",
			details: {
				published: pubDate,
				categories: category ? [category] : [],
				publishers: author ? [author] : [],
			},
			avatar: {
				src: url,
				alt: title,
			},
		};
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