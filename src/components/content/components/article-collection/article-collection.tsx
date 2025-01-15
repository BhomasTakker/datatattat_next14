import { ComponentProps } from "@/types/component";
import { Collection } from "@/types/data-structures/collection/collection";
import { VariantsMap } from "./variant-map";

export const ArticleCollection = ({
	component,
	dataObject,
	...rest
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

	console.log("Articles Collection Rest", { rest });

	const { renderMethod, styles } = variantObject;

	return <div className={styles.root}>{renderMethod(articles)}</div>;
};
