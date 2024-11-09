import {
	ComponentsMap,
	ComponentsOptions,
} from "@/components/component/component-map";
import { PageComponent } from "@/types/page";

export const ComponentFactory = ({
	component,
}: {
	component: PageComponent;
}) => {
	const { componentType } = component || {};

	const Component = ComponentsMap.get(componentType as ComponentsOptions);

	// do better error handling
	if (!Component) {
		return <div>Component not found</div>;
	}

	return <Component component={component} />;
};
