import { ClientSideComponent } from "@/components/content/components/client-side-component-render";
import { PageComponent } from "@/types/page";
import { getData } from "@/actions/data/get-data";
import {
	ComponentsMap,
	ComponentsOptions,
} from "@/components/content/components/component-map";

type ComponentPreviewProps = {
	data: PageComponent | null;
};

export const ComponentPreview = ({ data }: ComponentPreviewProps) => {
	if (!data) {
		return <div>No component data available</div>;
	}

	const { componentType } = data || {};

	const Component = ComponentsMap.get(componentType as ComponentsOptions);

	// do better error handling
	if (!Component) {
		return <div>{`Component not found:- ${componentType}`}</div>;
	}

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<ClientSideComponent
				Component={Component}
				component={data}
				getData={getData}
			/>
		</div>
	);
};
