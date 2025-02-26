import {
	CollectionItem,
	ProviderItem,
} from "@/types/data-structures/collection/item/item";
import { RSSItem } from "@/types/data-structures/rss";
import { HydratedDocument } from "mongoose";
import { ExtraData } from "../types";
import {
	getArticleBySrc,
	saveOrCreateArticleBySrc,
} from "@/lib/mongo/actions/article";
import { getMeta } from "@/actions/html/get-meta";

const convertRssItem = (data: RSSItem) => {
	const {
		title,
		// content potentially more likely to have html

		description,
		author,
		category,
		link,
		pubDate,
		enclosure,
		// What is?
		content,
		contentSnippet,
	} = data;
	const { url = "" } = enclosure || {};
	const contentEncoded = data["content:encoded"];

	return {
		title: title,
		src: link,
		// feels wrong to use contentSnippet and content
		description: description || contentEncoded, //contentSnippet || content || description,
		contentEncoded,
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
	} as CollectionItem;
};

export type GetArticle = {
	item: RSSItem;
	extraData?: ExtraData;
	provider?: ProviderItem;
};
// We're doing unnecessary work here
// convert to required format
// get article data from meta
export const getArticle = async ({ item, extraData, provider }: GetArticle) => {
	const { src, details = {} } = convertRssItem(item);
	const { region, language, categories = [] } = extraData || {};

	// Do elsewhere and prbably check performance.....
	const mergedCategories = new Set([
		...(details.categories || []),
		...categories,
	]);
	const mergedDetails = {
		...details,
		region,
		language,
		categories: Array.from(mergedCategories),
	};

	const article = (await getArticleBySrc(
		src
	)) as HydratedDocument<CollectionItem>;
	if (article) {
		// check if need update
		// console.log("article in db return");
		// We should check if we have any additional data
		// Then update the article
		// console.log(`Already stored ${src}`);
		//clone!!
		return JSON.parse(JSON.stringify(article)) as CollectionItem;
	}

	const meta = await getMeta(src);
	if (!meta) {
		// console.log(`No meta loaded for ${src}`);
		return null;
	}
	const { title, description, image, imageAlt, type } = meta;

	if (!title || !image) {
		// We need a better or proper check here
		// based on type / we may not always expect an image
		// BlueSky post or some such
		// console.log(`Check Failed - Do not save ${src}`);
		return null;
	}

	const newArticle = {
		title,
		src,
		description: description || "",
		guid: "",
		variant: type || "",
		details: mergedDetails,
		avatar: {
			src: image,
			alt: imageAlt || "",
		},
		// incorrect here - in details
		...extraData,
		provider,
	};
	//0061-search-articles
	try {
		await saveOrCreateArticleBySrc(newArticle);
	} catch (err) {
		console.log(`Article Save Error, ${src} ${err}`);
	}

	return newArticle as CollectionItem;
};
