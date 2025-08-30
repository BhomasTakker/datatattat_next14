import { SpotifyCollectionItem } from "@/components/content/components/spotify-collection/audio-stack/types";
import { composeTransducers, processWithTransducer } from "@/data/conversions";
import { filterTransducer } from "@/data/conversions/transducers/transducers";
import { SpotifySearchProps } from "@/types/api/spotify";
import { OEmbed } from "@/types/data-structures/oembed";
import { getSort } from "./sort";
import { mapEpisodeToCollectionItem } from "./map";

/////////////////////////////////////
// This would be a conversions util?
// get from map of available sorts
// pass in id and params
/////////////////////////////////////
// With conversions
// We would specify the id to apply the sort function to
/////////////////////////////////////

export const spotifyConversion = (
	items: SpotifyCollectionItem[],
	params: SpotifySearchProps
) => {
	const sort = getSort(params);

	// compose our transducer
	const transducer = composeTransducers<SpotifyCollectionItem[]>(
		mapEpisodeToCollectionItem,
		// there may or may not be a sort applied
		// should probably apply a no-op if not i.e. return 0
		...sort
	);
	// apply the transducer
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
