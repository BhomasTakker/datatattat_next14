import { SpotifyCollectionItem } from "@/components/content/components/spotify-collection/audio-stack/types";
import { getSortTransducer } from "@/data/conversions/transducers/sort";
import {
	SortDirection,
	SortType,
} from "@/data/conversions/transducers/sort/types";
import {
	SpotifySearchProps,
	SpotifySearchResultsSortOptions,
} from "@/types/api/spotify";

export const getSort = (params: SpotifySearchProps) => {
	const { sort, direction = SortDirection.Descending } = params;

	if (!sort) return [];
	switch (sort) {
		case SpotifySearchResultsSortOptions.released:
			const transducer = getSortTransducer<SpotifyCollectionItem>(
				SortType.Date,
				"details.published",
				direction
			);
			return transducer ? [transducer] : [];
		case SpotifySearchResultsSortOptions.duration:
			const durationTransducer = getSortTransducer<SpotifyCollectionItem>(
				SortType.Number,
				"media.duration",
				direction
			);
			return durationTransducer ? [durationTransducer] : [];
		case SpotifySearchResultsSortOptions.relevance:
		default:
			return [];
	}
};
