export type PageContainer = {
	containerType: "Stack" | "Grid";
	initData: object;
};

export type PageProps = object;

export type PageComponent = {
	componentType: string;
	componentProps: object;
	_with: object;
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
