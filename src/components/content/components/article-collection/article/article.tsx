import { StyleSheet } from "@/types/css";
import { CollectionItem } from "@/types/data-structures/collection/item/item";

type ArticleProps = {
	article: CollectionItem;
	styles: StyleSheet;
};

export const Article = ({ article, styles }: ArticleProps) => {
	const { title, description, avatar } = article;

	return (
		<article className={styles.article}>
			{/* next image - remember the full size thing
    need correct ratio */}
			<img src={avatar?.src} alt={avatar?.alt} className={styles.image}></img>
			<div className={styles.container}>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.decscription}>{description}</p>
				<div className={styles.meta}>Meta</div>
			</div>
		</article>
	);
};
