import { ComponentDataMap, ComponentDataOptions } from "./component-data-map";

export const ComponentDataFactory = (id: ComponentDataOptions) => {
	const dataObject = ComponentDataMap.get(id);

	return dataObject;
};
