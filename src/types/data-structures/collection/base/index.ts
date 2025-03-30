import { UnknownObject } from "@/types/utils";

export type BaseInfo = {
	title: string;
	src: string; // URL format
	description?: string;
	guid: string;
	variant: string; // union
	collectionType?: string;
	original?: UnknownObject;
};

export type Details = {
	docs?: string[];
	categories?: string[];
	authors?: string[];
	publishers?: string[];
	published?: Date | string;
	modified?: Date | string;
};

export type Media = UnknownObject;

export type Avatar = {
	src: string;
	alt: string;
};

export type Pagination = {
	results: number;
};
