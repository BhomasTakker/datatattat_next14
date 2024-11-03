type Content = {
	container: {
		containerType: string;
		initData: object;
	};
	props: object;
	components: Array<{
		componentType: string;
		componentProps: object;
		_with: object;
	}>;
};

export type IPage = {
	meta: object;
	style: object;
	route: string;
	creator: ObjectId;

	createdAt: Date;
	updatedAt: Date;

	content: Content;
};
