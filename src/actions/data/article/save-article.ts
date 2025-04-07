"use server";

import { saveOrCreateArticleBySrc } from "@/lib/mongo/actions/article";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { UnknownObject } from "@/types/utils";
import { validateArticleData } from "./utils";
import { initialiseServices } from "@/lib/services/intialise-services";

// Stop gap - we need to properly define all of our Article Types
type SaveArticleItem = CollectionItem & UnknownObject;

export const saveOrUpdateArticle = async (item: SaveArticleItem) => {
	// validate item
	if (validateArticleData(item)) {
		await initialiseServices();
		return await saveOrCreateArticleBySrc(item);
	}
	return Promise.resolve(null);
};
