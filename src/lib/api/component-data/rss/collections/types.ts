import { ProviderItem } from "@/types/data-structures/collection/item/item";
import { DataResponse, RSSChannelType } from "@/types/data-structures/rss";

export type ArticleSource = {
	name: string;
	src: string;
};

// I guess just add to this ??
// and update the model?
// better than schema strict: false
export type SourceObject = {
	categories?: string[];
	region?: string;
	language?: string;
	collectionType?: string;
	sources?: ArticleSource[];
};

export type ExtraData = Omit<SourceObject, "sources">;

export type GetCollection = {
	url: string;
	rssFeed: DataResponse;
	extraData?: ExtraData;
	provider?: ProviderItem;
};
