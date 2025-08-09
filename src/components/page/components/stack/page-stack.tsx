import { PageComponents, PageContent } from "@/types/page";

import { PageStackCollectionVariants } from "@/types/components/page/stack";
import { PageStackVariantMap } from "./variant-map";
import { PageStackProps } from "./types";

export type PageStackContent = {
	containerType: string;
	props: PageStackProps;
	components: PageComponents;
};

export const PageStack = ({ content }: { content: PageContent }) => {
	const { props, components } = content as PageStackContent;

	const { variant = PageStackCollectionVariants.Vertical } = props || {};

	/////////////////////////////////////////////////////////////////////
	// potentially pre load some data here i.e. first three components
	// the rest pass a function/object to load the data client side
	// then can lazy load the rest of the components
	/////////////////////////////////////////////////////////////////////

	const variantObject = PageStackVariantMap.get(variant);
	if (!variantObject) {
		return null;
	}

	const { renderMethod, styles } = variantObject;
	return (
		<ul className={styles.root} data-testid="page-component">
			{/* @ts-ignore - very generic type - we are targetting based on variant - how to type this properly */}
			{renderMethod({ components, ...props })}
		</ul>
	);
};
