import { BaseInfo, Details, Avatar } from "../base";

export type CollectionItem = BaseInfo & {
	details?: Details;
	avatar?: Avatar;
};
