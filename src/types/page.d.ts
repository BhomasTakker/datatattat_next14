import { ComponentProfile } from "@/components/content/component-profile/component-profile";
import { UnknownObject } from "./utils";

export type PageContainer = {
	containerType: "Stack" | "Grid";
	initData: object;
};

export type PageProps = object;

export type ComponentProfileProps = {
	componentTitle: string;
	componentTitleLink: string;
	showComponentTitle: boolean;
};

// Joined with ComponentProfile but should extend?
export type ComponentProps = {
	// this should be agiven no?
	variant: string;
} & ComponentProfile &
	UnknownObject;

export type Conversions = {
	response: object;
	sub: object;
	conversionId: string;
};

export type WithQuery = {
	provider: string;
	params: object;
	conversions: Conversions;
	queryId: string;
};

export type With = {
	type: string;
	query: WithQuery;
};

export type PageComponent = {
	componentType: string;
	componentProps: ComponentProps;
	_with: With;
};

export type PageComponents = Array<PageComponent>;

export type PageContent = {
	container: PageContainer;
	props: PageProps;
	components: PageComponents;
};

export type PageProfile = {
	pageTitle?: string;
	pageTitleVariant?: string; //union
	showPageTitle?: boolean;
};

// do better!
export type IPage = {
	meta: object;
	style: object;
	profile: PageProfile;
	route: string;
	creator: ObjectId;

	createdAt: Date;
	updatedAt: Date;

	content: PageContent;
};
