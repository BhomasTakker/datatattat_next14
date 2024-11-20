import { UnknownObject } from "./utils";
import { PageComponent } from "./page";

export type ComponentDataObject = {
	data: UnknownObject;
};

export type ComponentProps = {
	component: PageComponent;
	dataObject: ComponentDataObject;
};

export type ComponentProfileProps = {
	componentTitle: string;
	componentTitleLink: string;
	showComponentTitle: boolean;
};

// Joined with ComponentProfile but should extend?
export type ComponentPropsObject = {
	// this should be agiven no?
	variant: string;
} & ComponentProfileProps &
	UnknownObject;
