import { PageComponents } from "@/types/page";
import styles from "./vertical-stack.module.scss";
import { ComponentDisplay } from "@/components/content/component-display";

type StackProps = {
	components: PageComponents;
};

const renderComponents = ({ components }: StackProps) => {
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

export const verticalStack = {
	styles: styles,
	renderMethod: renderComponents,
};
