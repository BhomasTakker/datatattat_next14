import { ProviderArticleCollectionComponent } from "./provider-component";
import { ProviderCollectionCard } from "./provider-collection-card";
import { ProviderHeader } from "./provider-header";
import { ArticleCollectionVariants } from "@/components/content/components/article-collection/variants";
import { getArticlesByProviderId } from "@/lib/mongo/actions/article";
import { getArticleCollectionsByProviderId } from "@/lib/mongo/actions/articleCollection";
import { cloneDeep } from "@/utils/object";
import {
	PlayerCollectionVariant,
	PlayerSourceTypes,
} from "@/components/content/components/article-collection/collections/video-display/structs";
import { ProviderItem } from "@/types/data-structures/collection/item/item";
import styles from "./provider-page.module.scss";

type Props = {
	providerData: ProviderItem;
};

export const ProviderPage = async ({ providerData }: Props) => {
	const providerId = providerData._id?.toString();
	if (!providerId) {
		return <h1>404</h1>;
	}
	const collections = await getArticleCollectionsByProviderId(providerId);
	// We need to create an aggregate, get by provider and dateDescending
	const articles = await getArticlesByProviderId(providerId, {
		variant: "article",
	});
	const videoArticles = await getArticlesByProviderId(providerId, {
		variant: "video",
	});
	return (
		<div className={styles.root}>
			<section>
				<ProviderHeader provider={providerData} />
			</section>
			{articles.length > 0 && (
				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>Latest Articles</h2>
					<ProviderArticleCollectionComponent
						variant={ArticleCollectionVariants.StackScroller}
						items={cloneDeep(articles)}
						componentProps={{}}
					/>
				</section>
			)}

			{videoArticles.length > 0 && (
				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>Latest Videos</h2>
					<ProviderArticleCollectionComponent
						variant={ArticleCollectionVariants.videoDisplay}
						items={cloneDeep(videoArticles)}
						componentProps={{
							variant: PlayerCollectionVariant.VerticalScroll,
							sourceType: PlayerSourceTypes.Youtube,
						}}
					/>
				</section>
			)}
			{collections.length > 0 && (
				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>Collections</h2>
					<div className={styles.collectionsGrid}>
						{collections.map((collection, i) => (
							<ProviderCollectionCard
								key={collection.feed ?? i}
								collection={collection}
							/>
						))}
					</div>
				</section>
			)}
		</div>
	);
};
