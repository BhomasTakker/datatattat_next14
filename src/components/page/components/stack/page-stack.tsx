import { PageComponents, PageContainer, PageContent } from "@/types/page";
import styles from "./page-stack.module.scss";
import { ComponentDisplay } from "@/components/content/component-display";

// We should probably have 'style' in the Props type
type PageStackProps = {
	direction: string;
};

export type PageStackContent = {
	containerType: string;
	props: PageStackProps;
	components: PageComponents;
};

export const PageStack = ({ content }: { content: PageContent }) => {
	const { props, components } = content as PageStackContent;

	const { direction: style = "column" } = props || {};

	/////////////////////////////////////////////////////////////////////
	// potentially pre load some data here i.e. first three components
	// the rest pass a function/object to load the data client side
	// then can lazy load the rest of the components
	/////////////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////
	// Look at articleCollection for what we should do here
	////////////////////////////////////////////////////////
	const renderComponents = () => {
		return components.map((component, index) => {
			return (
				<li key={index}>
					<ComponentDisplay key={index} component={component} />
				</li>
			);
		});
	};

	const className = `${styles.root} ${styles[`root-${style}`]}`;

	// Semantically this should be a list of components
	return <ul className={className}>{renderComponents()}</ul>;
};
