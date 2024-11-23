import { StyleSheet } from "@/types/css";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { Meta } from "./meta/meta";
import { ArticleImage } from "./media/image";

type ArticleProps = {
	article: CollectionItem;
	styles: StyleSheet;
};

export const Article = async ({ article, styles }: ArticleProps) => {
	const { title, description, avatar, src, details } = article;
	const { src: image, alt: imageAlt } = avatar || {};
	const { categories, authors, published, publishers } = details || {};

	return (
		// <Interaction type={InteractionsOptions.Navigate} href={src || ""}>
		<article className={styles.article}>
			{/* next image - remember the full size thing
    need correct ratio */}
			{/* Media may not be required? Would we ever play a thing? - maybe - if so then add it */}
			{/* Just be image - on click play media etc - the asset is always an image */}
			{image && (
				<ArticleImage
					image={image}
					imageAlt={
						imageAlt ||
						`We're sorry. This image does not have any alternative text.`
					}
					styles={styles}
				/>
			)}
			<div className={styles.contentContainer}>
				<div className={styles.textContainer}>
					<h3 className={styles.title}>{title}</h3>
					<p className={styles.description}>{description}</p>
				</div>
				<Meta
					styles={styles}
					categories={categories}
					authors={authors}
					published={published}
					publishers={publishers}
				/>
			</div>
		</article>
		// </Interaction>
	);
};
