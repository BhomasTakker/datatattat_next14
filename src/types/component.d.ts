import { UnknownObject } from "./utils";
import { PageComponent } from "./page";

export type ComponentDataObject = {
	data: UnknownObject;
};

export type ComponentProps = {
	component: PageComponent;
	dataObject: ComponentDataObject;
};
