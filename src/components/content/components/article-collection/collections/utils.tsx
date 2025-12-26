import { StyleSheet } from "@/types/css";
import { Article } from "../article/article";
import { ArticleRenderProps } from "./types";
import { getClientMeta } from "@/actions/client/get-meta";

// Somwhere better
export const articleRenderer =
	(styles: StyleSheet) => (item: ArticleRenderProps) =>
		<Article article={item} styles={styles} />;

export const articleTemplate = (styles: StyleSheet) => {
	return <div className={styles.template} />;
};

export const articleMetaLoader = (item: ArticleRenderProps) => async () => {
	const loadData = item?.loadData;
	if (loadData) {
		const data = await getClientMeta(item);
		return data;
	}
	return item;
};
