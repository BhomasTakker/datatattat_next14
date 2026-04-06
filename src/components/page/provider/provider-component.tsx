"use client";

import { ArticleCollection } from "@/components/content/components/article-collection/article-collection";
import { ArticleCollectionVariants } from "@/components/content/components/article-collection/variants";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { UnknownObject } from "@/types/utils";

type Props = {
	variant: ArticleCollectionVariants;
	items: CollectionItem[];
	componentProps: UnknownObject;
};

export const ProviderArticleCollectionComponent = ({
	variant,
	items,
	componentProps,
}: Props) => {
	return (
		<div>
			<ArticleCollection
				component={{
					componentType: "ArticleCollection",
					componentProps: {
						variantType: variant,
						...componentProps,
					} as any,
				}}
				dataObject={{ data: { items } }}
			/>
		</div>
	);
};
