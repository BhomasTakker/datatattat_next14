"use server";

import { fetchWithCache } from "@/lib/redis/redis-fetch";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { getMeta } from "../html/get-meta";

// copied and several places
const getMetaItem = async (item: CollectionItem) => {
	const meta = await getMeta(item.src);
	if (!meta) {
		return null;
	}
	const { src, details = {} } = item;
	const { title, description, image, imageAlt, url } = meta;

	return {
		title: title,
		// We save under src - sometimes no url!!
		src,
		description: description,
		guid: "",
		variant: "article",
		details,
		avatar: {
			src: image,
			alt: imageAlt,
		},
	};
};

export const getClientMeta = async (item: CollectionItem) => {
	const data = await fetchWithCache(() => getMetaItem(item), item.src);
	return data;
};
