import { PlayerSourceTypes } from "@/components/content/components/article-collection/collections/video-display/structs";
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

// We can type depending on the media type
export type Media = UnknownObject & {
	format?: PlayerSourceTypes;
};

export type Avatar = {
	src: string;
	alt: string;
};

export type Pagination = {
	results: number;
};
