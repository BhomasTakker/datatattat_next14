import { getData } from "@/actions/data/get-data";
import {
	ComponentsMap,
	ComponentsOptions,
} from "@/components/content/components/component-map";
import { PageComponent } from "@/types/page";
import { UnknownObject } from "@/types/utils";

export const ComponentFactory = async ({
	component,
}: {
	component: PageComponent;
}) => {
	const { componentType } = component || {};

	const Component = ComponentsMap.get(componentType as ComponentsOptions);

	// do better error handling
	if (!Component) {
		return <div>{`Component not found:- ${componentType}`}</div>;
	}

	//////////////////////////////////////////////////////////////////////////
	// We would in some instances perhaps want to lazy load page components
	// Pass data in to factory?
	// Factory shouldn't be concerned with loading data
	// we should pass data or a data function (if possible) to the component
	const { _with: queryObject } = component;
	const data = (await getData(queryObject)) as UnknownObject;

	// all components take in a component object
	// AND and a data object
	// data object contains data and any data functions
	// data functions can be used to refecth or manipulate queries
	return <Component component={component} dataObject={{ data }} />;
};
