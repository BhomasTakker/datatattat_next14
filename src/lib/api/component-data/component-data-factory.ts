import { ComponentDataMap } from "./component-data-map";
import { ComponentDataOptions } from "./component-data-options";

export const ComponentDataFactory = (id: ComponentDataOptions) => {
	const dataObject = ComponentDataMap.get(id);

	return dataObject;
};
