"use server";

import { rssParse } from "@/lib/api/component-data/rss/rss-parse";
import {
	determineFeedType,
	getParserCustomFields,
} from "@/lib/api/component-data/rss/utils";
import {
	getArticleCollectionByFeed,
	saveOrCreateArticleCollectionByFeed,
} from "@/lib/mongo/actions/articleCollection";
import { RSSArticleCollection } from "@/types/data-structures/collection/collection";
import { RSSChannelType } from "@/types/data-structures/rss";
import { cloneDeep } from "@/utils/object";

export const getCollection = async (url: string) => {
	const sourceType = determineFeedType(new URL(url));

	const articleCollection = await getArticleCollectionByFeed(url);
	const parsedArticleCollection = cloneDeep(
		articleCollection
	) as RSSArticleCollection;

	if (articleCollection) {
		// Temp fix for items saved as strings
		const mod = parsedArticleCollection.items.map((item) => {
			if (typeof item === "string") {
				return {
					link: item,
				};
			}
			return item;
		});
		return { ...parsedArticleCollection, items: mod };
	}

	const loadedCollection = await rssParse(
		url,
		getParserCustomFields(sourceType)
	);

	if (!loadedCollection) {
		return Promise.reject("Error fetching collection");
	}

	let saveCollection = loadedCollection;

	// modify by source type function
	// by source type save differently
	if (sourceType !== "youtube") {
		const items = loadedCollection.items.map((item) => {
			return {
				link: item.link,
			};
		});

		saveCollection = {
			...loadedCollection,
			items,
		};
	}

	if (!saveCollection) {
		return Promise.resolve(null);
	}

	saveOrCreateArticleCollectionByFeed(saveCollection as RSSChannelType);

	return loadedCollection;
};
