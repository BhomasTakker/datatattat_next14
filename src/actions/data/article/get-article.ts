"use server";

import { getMeta } from "@/actions/html/get-meta";
import {
	getArticleBySrc,
	saveOrCreateArticleBySrc,
} from "@/lib/mongo/actions/article";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { HydratedDocument } from "mongoose";

// Potentially a withDb Thing or other
type GetArticleItem = Partial<CollectionItem> & Pick<CollectionItem, "src">;
// not here
export const getArticle = async (item: GetArticleItem) => {
	const { src, details = {} } = item;

	const article = (await getArticleBySrc(
		src
	)) as HydratedDocument<CollectionItem>;
	if (article) {
		// We should check if we have any additional data
		// Then update the article

		return JSON.parse(JSON.stringify(article)) as CollectionItem;
	}

	const meta = await getMeta(src);
	if (!meta) {
		return null;
	}
	const { title, description, image, imageAlt, type } = meta;

	if (!title || !description || !image) {
		// We need a better or proper check here
		// based on type / we may not always expect an image
		// BlueSky post or some such
		return null;
	}

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
		await saveOrCreateArticleBySrc(newArticle);
	} catch (err) {
		console.log("getArticle Error", { err });
	}

	return newArticle as CollectionItem;
};
