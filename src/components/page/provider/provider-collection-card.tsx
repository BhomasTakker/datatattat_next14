import { RSSArticleCollection } from "@/types/data-structures/collection/collection";
import styles from "./provider-collection-card.module.scss";

type Props = {
	collection: RSSArticleCollection;
};

export const ProviderCollectionCard = ({ collection }: Props) => {
	const { title, description, feed, image, items } = collection;

	return (
		<div className={styles.card}>
			{image?.url && (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={image.url}
					alt={image.title ?? title ?? ""}
					className={styles.cardImage}
				/>
			)}
			<div className={styles.cardBody}>
				{title && <h3 className={styles.cardTitle}>{title}</h3>}
				{description && <p className={styles.cardDescription}>{description}</p>}
				<div className={styles.cardMeta}>
					{feed && (
						<a
							href={feed}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.cardFeed}
						>
							{feed}
						</a>
					)}
					<span className={styles.cardCount}>{items.length} items</span>
				</div>
			</div>
		</div>
	);
};
