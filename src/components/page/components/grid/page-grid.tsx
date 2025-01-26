import { PageComponents, PageContainer, PageContent } from "@/types/page";
import styles from "./page-grid.module.scss";
import { ComponentDisplay } from "@/components/content/component-display";

// We should probably have 'style' in the Props type
type PageGridProps = {
	layout: string;
};

export type PageGridContent = {
	containerType: "Grid";
	props: PageGridProps;
	components: PageComponents;
};

export const PageGrid = ({ content }: { content: PageContent }) => {
	const { props, components } = content;
	const { layout: style } = (props as PageGridProps) || {};

	/////////////////////////////////////////////////////////////////////
	// potentially pre load some data here i.e. first three components
	// the rest pass a function/object to load the data client side
	// then can lazy load the rest of the components
	/////////////////////////////////////////////////////////////////////
	const renderComponents = () => {
		return components.map((component, index) => {
			// potentially wrap in a div - if we need to control grid items
			// we should be able to use a pure css way?
			return <ComponentDisplay key={index} component={component} />;
		});
	};

	const className = `${styles.root} ${styles[`root-${style}`]}`;

	return (
		<section data-testid="page-grid" className={className}>
			{renderComponents()}
		</section>
	);
};
