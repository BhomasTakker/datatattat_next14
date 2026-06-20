import { CollectionItem } from "@/types/data-structures/collection/item/item";
import styles from "./article-list.module.scss";

export const ArticleList = ({ articles }: { articles: CollectionItem[] }) => {
	return (
		<ul className={styles.articleList}>
			{articles.map((item) => (
				<li key={item._id} className={styles.articleItem}>
					<h2>{item.title}</h2>
				</li>
			))}
		</ul>
	);
};
