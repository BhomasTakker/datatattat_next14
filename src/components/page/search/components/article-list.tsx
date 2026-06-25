import { CollectionItem } from "@/types/data-structures/collection/item/item";
import styles from "./article-list.module.scss";
import { ArticleCollection } from "@/components/content/components/article-collection/article-collection";
import { ArticleCollectionVariants } from "@/components/content/components/article-collection/variants";
import {
	PlayerCollectionVariant,
	PlayerSourceTypes,
} from "@/components/content/components/article-collection/collections/video-display/structs";

type ArticleListProps = {
	articles: CollectionItem[];
	articleVariant?: "article" | "video"; // | 'audio' | 'image' | 'document';
};

const articleComponentPropsMap = {
	article: {
		componentType: "ArticleCollection",
		componentProps: {
			variantType: ArticleCollectionVariants.StackScroller,
		} as any,
	},
	video: {
		componentType: "ArticleCollection",
		componentProps: {
			variantType: ArticleCollectionVariants.videoDisplay,
			sourceType: PlayerSourceTypes.Youtube,
			variant: PlayerCollectionVariant.VerticalScroll,
		} as any,
	},
} as const;

export const ArticleList = ({ articles, articleVariant }: ArticleListProps) => {
	return (
		<ArticleCollection
			component={articleComponentPropsMap[articleVariant || "article"]}
			dataObject={{ data: { items: articles } }}
		/>
	);
};
