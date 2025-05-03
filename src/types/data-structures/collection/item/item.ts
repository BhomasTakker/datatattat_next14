import { BaseInfo, Details, Avatar, Media } from "../base";

export type ProviderItem = {
	name: string;
	description: string;
	url: string;
	rating: number;
	leaning: number;
	origin: string;
	logo?: string;
};

export type CollectionItem = BaseInfo & {
	details?: Details;
	avatar?: Avatar;
	provider?: ProviderItem;
	media?: Media;
};
