import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { Article } from "../../article/article";
import styles from "./display-article.module.scss";

type DisplayArticleProps = {
	item: CollectionItem;
};

export const DisplayArticle = ({ item }: DisplayArticleProps) => {
	return (
		<div data-testid="display-article">
			<Article article={item} styles={styles} />
		</div>
	);
};
