import { getMeta } from "@/actions/html/get-meta";
import { getArticleBySrc } from "@/lib/mongo/actions/article";
import { RSSChannelType, RSSItem } from "@/types/data-structures/rss";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { cloneDeep } from "@/utils/object";
import { filterLimit } from "../utils/limit";
import { saveOrUpdateArticle } from "@/actions/data/article/save-article";

const adaptItem = async (item: RSSItem) => {
	const { title, description, link, pubDate, guid, content } = item;

	// check db for existing article
	// if exists return it
	if (!link) {
		return item;
	}

	const existingArticle = await getArticleBySrc(link);
	if (existingArticle) {
		return existingArticle;
	}

	const meta = await getMeta(link);
	const {
		image,
		title: metaTitle = "",
		description: metaDescription = "",
	} = meta || {};

	// You want to save each article

	const article: CollectionItem = {
		src: link,
		title: title || metaTitle || "",
		description: description || metaDescription || "",
		avatar: {
			src: image || "",
			alt: metaTitle || "",
		},
		guid: guid || "",
		// provider: checkProvider()
		variant: "article",
		details: {
			published: pubDate,
		},
	};

	await saveOrUpdateArticle(article);
	return article;
};

export const articleAdapter = async ({
	title,
	link,
	description,
	items = [],
	image,
	feedUrl,
}: RSSChannelType) => {
	const filteredItems = filterLimit(items) as RSSItem[];

	const promises = filteredItems.map((item) => {
		return adaptItem(item);
	});

	const articles = (await Promise.all(promises)) as RSSItem[];
	const collection: RSSChannelType = {
		title,
		link,
		description,
		image,
		feedUrl,
		items: articles,
	};

	// console.log("articleAdapter", collection);
	return cloneDeep(collection) as RSSChannelType;
};
