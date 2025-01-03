export type HeaderNav = { label: string; route: string }[];

export type HeaderType = {
	route: string;
	nav: HeaderNav;

	readonly creator: ObjectId;

	readonly createdAt: Date;
	readonly updatedAt: Date;
};
