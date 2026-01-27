import { StyleSheet } from "@/types/css";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { Meta } from "./meta/meta";
import { ArticleImage } from "./media/image";
import { stripHTML } from "@/utils/html";

type ArticleProps = {
	article: CollectionItem;
	styles: StyleSheet;
};

export const Article = ({ article, styles }: ArticleProps) => {
	const {
		title,
		description,
		avatar,
		details,
		src,
		provider: articleProvider,
	} = article;
	const { src: image, alt: imageAlt } = avatar || {};
	const { published, publishers } = details || {};
	const { logo = "" } = articleProvider || {};

	// should be done on create/save data
	const provider = src ? new URL(src).hostname : "";
	const publisher = articleProvider
		? articleProvider.name
		: publishers?.join(", ");

	return (
		// <Interaction type={InteractionsOptions.Navigate} href={src || ""}>
		<article className={styles.article}>
			{/* next image - remember the full size thing
    need correct ratio */}
			{/* Media may not be required? Would we ever play a thing? - maybe - if so then add it */}
			{/* Just be image - on click play media etc - the asset is always an image */}
			{/* We need a 'showImage' flag here - we may want just the text */}
			<ArticleImage
				image={image || logo}
				// logo OR placeholder
				fallback={logo}
				imageAlt={
					imageAlt ||
					`We're sorry. This image does not have any alternative text.`
				}
				styles={styles}
			/>
			<div className={styles.contentContainer}>
				<div className={styles.textContainer}>
					<h3 className={styles.title}>{stripHTML(title)}</h3>
					{description ? (
						<p className={styles.description}>{stripHTML(description)}</p>
					) : null}
				</div>
				<Meta
					styles={styles}
					published={published}
					// bit of a fudge - we want to use article.provider for article
					// publisher for youtube video
					// OR OUR provider.name in preference to any and all alternatives
					publisher={publisher || provider}
				/>
			</div>
		</article>
		// </Interaction>
	);
};
