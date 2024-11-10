import { getData } from "@/actions/data/get-data";
import {
	ComponentsMap,
	ComponentsOptions,
} from "@/components/content/components/component-map";
import { PageComponent } from "@/types/page";

export const ComponentFactory = async ({
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

	const data = await getData();

	console.log({ data });
	// Literally just a get data server action
	// pass it to the component

	return <Component component={component} />;
};
