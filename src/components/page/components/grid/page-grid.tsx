import { PageComponents, PageContainer, PageContent } from "@/types/page";
import styles from "./page-grid.module.scss";
import { ComponentDisplay } from "@/components/component/component-display";

// We should probably have 'style' in the Props type
type PageGridProps = {
	layout: string;
};

export type PageGridContent = {
	container: PageContainer;
	props: PageGridProps;
	components: PageComponents;
};

export const PageGrid = ({ content }: { content: PageContent }) => {
	const { props, components } = content as PageGridContent;
	const { layout: style } = props || {};

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
