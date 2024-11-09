import { PageComponents, PageContainer, PageContent } from "@/types/page";
import styles from "./page-grid.module.scss";

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
			const { componentType, componentProps } = component;
			return (
				<section data-testid="page-grid-item" key={index}>
					{`Component type:- ${componentType}`}
					{`Component props:- ${JSON.stringify(componentProps)}`}
				</section>
			);
		});
	};

	const className = `${styles.root} ${styles[`root-${style}`]}`;

	return (
		<section data-testid="page-grid" className={className}>
			{renderComponents()}
		</section>
	);
};
