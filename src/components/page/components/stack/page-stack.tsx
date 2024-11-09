import { PageComponents, PageContainer, PageContent } from "@/types/page";
import styles from "./page-stack.module.scss";

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

	// Question is
	// Should we have render components functions
	// in this case a ListItem render component
	// Point being
	// all compenents will be rendered in largely the same way
	// just of different elements and classes
	const renderComponents = () => {
		return components.map((component, index) => {
			const { componentType, componentProps } = component;
			return (
				<li key={index}>
					{`Component type:- ${componentType}`}
					<section>{`Component props:- ${JSON.stringify(
						componentProps
					)}`}</section>
				</li>
			);
		});
	};

	const className = `${styles.root} ${styles[`root-${style}`]}`;

	// Semantically this should be a list of components
	return <ul className={className}>{renderComponents()}</ul>;
};
