"use server";

import { getMeta } from "@/actions/html/get-meta";
import {
	getArticleBySrc,
	saveOrCreateArticleBySrc,
} from "@/lib/mongo/actions/article";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { HydratedDocument } from "mongoose";
import { validateArticleData } from "./utils";
import { cloneDeep } from "@/utils/object";
import { initialiseServices } from "@/lib/services/intialise-services";

// Potentially a withDb Thing or other
type GetArticleItem = Partial<CollectionItem> & Pick<CollectionItem, "src">;
// not here
export const getArticle = async (item: GetArticleItem) => {
	const { src, details = {} } = item;
	await initialiseServices();

	const article = (await getArticleBySrc(
		src
	)) as HydratedDocument<CollectionItem>;
	if (article) {
		return cloneDeep(article) as CollectionItem;
	}

	const meta = await getMeta(src);
	if (!meta) {
		return null;
	}
	const { title, description, image, imageAlt, type } = meta;

	const newArticle = {
		title,
		src,
		description,
		guid: "",
		variant: type || "",
		details,
		avatar: {
			src: image,
			alt: imageAlt || "",
		},
	};

	try {
		// casting not really okay but this was annoying
		if (validateArticleData(newArticle as CollectionItem)) {
			await saveOrCreateArticleBySrc(newArticle as CollectionItem);
		}
	} catch (err) {
		console.log("getArticle Error");
	}

	return newArticle as CollectionItem;
};
