import { PageComponents, PageContent } from "@/types/page";
import styles from "./page-stack.module.scss";
import { ComponentDisplay } from "@/components/content/component-display";

import {
	PageStackSizeOptions,
	PageStackVariant,
} from "@/types/components/page/stack";

type PageStackProps = {
	variant: PageStackVariant;
	height: PageStackSizeOptions;
	width: PageStackSizeOptions;
};

export type PageStackContent = {
	containerType: string;
	props: PageStackProps;
	components: PageComponents;
};

export const PageStack = ({ content }: { content: PageContent }) => {
	const { props, components } = content as PageStackContent;

	const {
		variant = PageStackVariant.Vertical,
		height = "Free",
		width = "Free",
	} = props || {};

	/////////////////////////////////////////////////////////////////////
	// potentially pre load some data here i.e. first three components
	// the rest pass a function/object to load the data client side
	// then can lazy load the rest of the components
	/////////////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////
	// Look at articleCollection for what we should do here
	////////////////////////////////////////////////////////
	const renderComponents = () => {
		const className = `
		${styles.item}
		${styles[`root-height-${String(height).toLowerCase()}`]} ${
			width ? styles[`root-width-${String(width).toLowerCase()}`] : ""
		}`;
		return components.map((component, index) => {
			return (
				<li key={index} data-testid="content-component" className={className}>
					<ComponentDisplay key={index} component={component} />
				</li>
			);
		});
	};

	const className = `${styles.root} ${
		styles[`root-${String(variant).toLowerCase()}`]
	}`;

	// Semantically this should be a list of components
	return (
		<ul className={className} data-testid="page-component">
			{renderComponents()}
		</ul>
	);
};
