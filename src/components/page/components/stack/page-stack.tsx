import { PageComponents, PageContainer, PageContent } from "@/types/page";
import styles from "./page-stack.module.scss";
import { ComponentDisplay } from "@/components/content/component-display";

// We should probably have 'style' in the Props type
type PageStackProps = {
	direction: string;
};

export type PageStackContent = {
	container: PageContainer;
	props: PageStackProps;
	components: PageComponents;
};

export const PageStack = ({ content }: { content: PageContent }) => {
	const { props, components } = content as PageStackContent;

	const { direction: style = "column" } = props || {};

	////////////////////////////////////////////////////////
	// Look at articleCollection for what we shuld do here
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
