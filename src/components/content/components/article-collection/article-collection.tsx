import { ComponentProps } from "@/types/component";
import { Collection } from "@/types/data-structures/collection/collection";
import { VariantsMap } from "./variant-map";

export const ArticleCollection = ({
	component,
	dataObject,
}: ComponentProps) => {
	const { componentProps } = component;
	const articlesData = dataObject.data as Collection;
	const { items: articles } = articlesData;
	const { variantType } = componentProps;

	const variantObject = VariantsMap.get(variantType);

	if (!variantObject) {
		// log
		return null;
	}

	// Questions
	// should we pass in props to the variantObject? / A. No
	// Should we render a given element
	const { renderMethod, styles } = variantObject;

	// take in variant and props
	// variant determines the css class
	// props determine the content / show meta, video, etc
	// the css class applies the styling to itself
	// AND the individual articles
	// use mixins i.e. articles.$ltrCard

	// Should we pass in props to the render method? / A. I think we have to
	// Pass props - if in there there is a limit variable
	// Use that within the render method itself
	// Render methods should be as simple or as complicated as they need to be
	return <div className={styles.root}>{renderMethod(articles)}</div>;
};
