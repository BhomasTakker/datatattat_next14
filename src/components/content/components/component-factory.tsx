import { getData } from "@/actions/data/get-data";
import {
	ComponentsMap,
	ComponentsOptions,
} from "@/components/content/components/component-map";
import { PageComponent } from "@/types/page";
import { ClientSideComponent } from "./client-side-component-render";
import { ComponentDataObject } from "@/types/component";

export const ComponentFactory = async ({
	component,
	isClient = false,
	isTemplate = false,
}: {
	component: PageComponent;
	isClient?: boolean;
	isTemplate?: boolean;
}) => {
	const { componentType } = component || {};

	const Component = ComponentsMap.get(componentType as ComponentsOptions);

	// do better error handling
	if (!Component) {
		return <div>{`Component not found:- ${componentType}`}</div>;
	}

	if (isTemplate) {
		const templateData: ComponentDataObject = { data: {} };
		// Components to have a renderTemplate method
		return (
			<Component
				component={component}
				dataObject={templateData}
				isTemplate={true}
			/>
		);
	}

	// Feels like fallback should be client side loading?
	if (isClient) {
		return (
			<ClientSideComponent
				Component={Component}
				component={component}
				getData={getData}
			/>
		);
	}

	//////////////////////////////////////////////////////////////////////////
	// We would in some instances perhaps want to lazy load page components
	// Pass data in to factory?
	// Factory shouldn't be concerned with loading data
	// we should pass data or a data function (if possible) to the component
	//////////////////////////////////////////////////////////////////////////
	// with data object moved into componentProps
	const { _with: componentQueryObject, componentProps } = component;
	const { _with: componentPropsQueryObject } = componentProps || {};

	const data = await getData(componentQueryObject || componentPropsQueryObject);

	// all components take in a component object
	// AND and a data object
	// data object contains data and any data functions
	// data functions can be used to refecth or manipulate queries
	return <Component component={component} dataObject={{ data }} />;
};
