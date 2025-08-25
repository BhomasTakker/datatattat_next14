import { composeTransducers, processWithTransducer } from "@/data/conversions";
import { getSortTransducer } from "@/data/conversions/transducers/sort";
import {
	SortDirection,
	SortType,
} from "@/data/conversions/transducers/sort/types";

import { filterTransducer } from "@/data/conversions/transducers/transducers";
import {
	EpisodeItem,
	SpotifySearchProps,
	SpotifySearchResultsSortOptions,
} from "@/types/api/spotify";
import { OEmbed } from "@/types/data-structures/oembed";

/////////////////////////////////////
// This would be a conversions util?
// get from map of available sorts
// pass in id and params
/////////////////////////////////////
// With conversions
// We would specify the id to apply the sort function to
/////////////////////////////////////
const getSort = (params: SpotifySearchProps) => {
	const { sort, direction = SortDirection.Descending } = params;

	if (!sort) return [];
	switch (sort) {
		case SpotifySearchResultsSortOptions.released:
			const transducer = getSortTransducer(
				SortType.Date,
				"release_date",
				direction
			);
			return transducer ? [transducer] : [];
		case SpotifySearchResultsSortOptions.duration:
			const durationTransducer = getSortTransducer(
				SortType.Number,
				"duration_ms",
				direction
			);
			return durationTransducer ? [durationTransducer] : [];
		case SpotifySearchResultsSortOptions.relevance:
		default:
			return [];
	}
};

export const spotifyConversion = (
	items: EpisodeItem[],
	params: SpotifySearchProps
) => {
	const sort = getSort(params);

	const transducer = composeTransducers(...sort);
	const result = processWithTransducer(items, transducer);
	return result;
};

export const oembedConversion = (items: (OEmbed | null)[]) => {
	const validItems = items.filter((item): item is OEmbed => item !== null);

	// spotify has a video player but no other way for us to omit it
	const filterAudio = filterTransducer<OEmbed, OEmbed[]>(
		(item) => item.type !== "video"
	);
	const transducer = composeTransducers(filterAudio);
	const result = processWithTransducer(validItems, transducer);
	return result;
};
