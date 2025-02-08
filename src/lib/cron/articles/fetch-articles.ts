import { RSSItem } from "@/types/data-structures/rss";
import { getArticle } from "./get-article";

type Items = RSSItem[];

export const fetchArticles = async (items: Items) => {
	const data = items.map((item, i) => {
		return getArticle(item);
	});

	return Promise.all(data);
};
