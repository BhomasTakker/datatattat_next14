import { PageComponents } from "@/types/page";
import styles from "./vertical-stack.module.scss";
import { ComponentDisplay } from "@/components/content/component-display";
import { ContainerHeightOptions, getContainerHeight } from "../../types";

type StackProps = {
	components: PageComponents;
	height: ContainerHeightOptions;
};

const renderComponents = ({ components, height }: StackProps) => {
	const className = `
		${styles.item}
	}`;

	const containerHeight = getContainerHeight(height);
	const componentHeight = containerHeight ? `${containerHeight}px` : "100%";

	return components.map((component, index) => {
		return (
			<li
				key={index}
				data-testid="content-component"
				className={className}
				style={{ maxHeight: componentHeight }}
			>
				<ComponentDisplay key={index} component={component} />
			</li>
		);
	});
};

export const verticalStack = {
	styles: styles,
	renderMethod: renderComponents,
};
