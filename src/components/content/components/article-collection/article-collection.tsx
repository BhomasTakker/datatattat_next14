"use client";
// Not strictly required here but required down the line
// In some instances
// We should do this betterOr we may well make these components
// data loading lazy and use InView etc

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

/////////////////////////////////////////////////////////////////////////////////////
// I don't see any real reason why this cannot be a 'use client' component
// we need to render the component IF on sceen
// Which then leads into - only preoload the first X components data
///////////////////////////////////////////////////////////////
export const ArticleCollection = ({
	component,
	dataObject,
	isTemplate = false,
}: ComponentProps) => {
	const { componentProps } = component;
	const articlesData = dataObject?.data as Collection;
	const { items: articles } = articlesData || { items: [] };
	const { variantType, ...rest } =
		componentProps as ArticleCollectionComponentProps;

	const variantObject = VariantsMap.get(variantType);

	if (!variantObject) {
		// log
		return null;
	}

	const { renderMethod, styles, renderTemplate } = variantObject;

	if (isTemplate) {
		return <div className={styles.root}>{renderTemplate()}</div>;
	}

	return (
		<div className={styles.root} data-testid={variantType}>
			{renderMethod(articles, rest)}
		</div>
	);
};
