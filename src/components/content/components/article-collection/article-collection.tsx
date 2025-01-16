import { ComponentProps, ComponentPropsObject } from "@/types/component";
import { Collection } from "@/types/data-structures/collection/collection";
import { VariantsMap } from "./variant-map";
import { VideoDisplayOptions } from "./collections/video-display/video-display";

// all of our variants will have a set of inputs
// we can define a type for these inputs
// Create a union type for all the possible variants
type VariantComponentProps = VideoDisplayOptions;
type ArticleCollectionComponentProps = VariantComponentProps &
	ComponentPropsObject;

export const ArticleCollection = ({
	component,
	dataObject,
}: ComponentProps) => {
	const { componentProps } = component;
	const articlesData = dataObject.data as Collection;
	const { items: articles } = articlesData;
	const { variantType, ...rest } =
		componentProps as ArticleCollectionComponentProps;

	const variantObject = VariantsMap.get(variantType);

	if (!variantObject) {
		// log
		return null;
	}

	const { renderMethod, styles } = variantObject;

	return <div className={styles.root}>{renderMethod(articles, rest)}</div>;
};
