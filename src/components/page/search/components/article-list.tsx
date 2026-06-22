import { CollectionItem } from "@/types/data-structures/collection/item/item";
import styles from "./article-list.module.scss";
import { ArticleCollection } from "@/components/content/components/article-collection/article-collection";
import { ArticleCollectionVariants } from "@/components/content/components/article-collection/variants";

/*
componentProps={{
	variant: PlayerCollectionVariant.VerticalScroll,
	sourceType: PlayerSourceTypes.Youtube,
}}
*/

export const ArticleList = ({ articles }: { articles: CollectionItem[] }) => {
	return (
		<ul className={styles.articleList}>
			<ArticleCollection
				component={{
					componentType: "ArticleCollection",
					componentProps: {
						variantType: ArticleCollectionVariants.StackScroller,
					} as any,
				}}
				dataObject={{ data: { items: articles } }}
			/>
		</ul>
	);
};
