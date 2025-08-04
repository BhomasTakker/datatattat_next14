import { PageComponents } from "@/types/page";
import styles from "./row-stack.module.scss";
import { ComponentDisplay } from "@/components/content/component-display";

type RowStackProps = {
	components: PageComponents;
	defaultRow: Object;
	rows: Object[];
};

const renderComponents = ({ components }: RowStackProps) => {
	const className = `
		${styles.item}
	}`;
	return components.map((component, index) => {
		return (
			<li key={index} data-testid="content-component" className={className}>
				<ComponentDisplay key={index} component={component} />
			</li>
		);
	});
};

export const rowStack = {
	styles: styles,
	renderMethod: renderComponents,
};
