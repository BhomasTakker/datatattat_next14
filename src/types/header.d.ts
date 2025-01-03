export type HeaderNav = { label: string; route: string }[];

export type HeaderType = {
	route: string;
	nav: HeaderNav;

	creator: ObjectId;

	createdAt: Date;
	updatedAt: Date;
};
