import { ProviderArticleCollectionComponent } from "./provider-component";
import { ArticleCollectionVariants } from "@/components/content/components/article-collection/variants";
import { getArticlesByProviderId } from "@/lib/mongo/actions/article";
import { getArticleCollectionsByProviderId } from "@/lib/mongo/actions/articleCollection";
import { cloneDeep } from "@/utils/object";
import {
	PlayerCollectionVariant,
	PlayerSourceTypes,
} from "@/components/content/components/article-collection/collections/video-display/structs";

type Props = {
	providerId: string;
};

export const ProviderPage = async ({ providerId }: Props) => {
	const collections = await getArticleCollectionsByProviderId(providerId);
	// We need to create an aggregate, get by provider and dateDescending
	const articles = await getArticlesByProviderId(providerId, {
		variant: "article",
	});
	const videoArticles = await getArticlesByProviderId(providerId, {
		variant: "video",
	});
	return (
		<div>
			<ProviderArticleCollectionComponent
				variant={ArticleCollectionVariants.StackScroller}
				items={cloneDeep(articles)}
				componentProps={{}}
			/>
			<ProviderArticleCollectionComponent
				variant={ArticleCollectionVariants.videoDisplay}
				items={cloneDeep(videoArticles)}
				componentProps={{
					variant: PlayerCollectionVariant.VerticalScroll,
					sourceType: PlayerSourceTypes.Youtube,
				}}
			/>
			{/* We would do more of these and different variants based on the collections */}
		</div>
	);
};
