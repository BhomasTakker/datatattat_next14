import { ContainerHeightOptions } from "@/components/page/components/stack/types";
import { SearchType } from "@/types/api/spotify";
import { CollectionItem } from "@/types/data-structures/collection/item/item";

export type SpotifyCollectionItem = CollectionItem & {
	id: string;
	media: {
		type: SearchType;
	};
};

export type AudioStackClientProps = {
	items: SpotifyCollectionItem[];
	height: ContainerHeightOptions;
};

export type SpotifyArticleProps = {
	item: SpotifyCollectionItem;
	onClick: (index: number) => void;
	index: number;
};
