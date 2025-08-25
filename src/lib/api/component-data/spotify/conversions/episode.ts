import { composeTransducers, processWithTransducer } from "@/data/conversions";
import { createDateSortTransducer } from "@/data/conversions/transducers/sort";
import {
	filterTransducer,
	mapTransducer,
} from "@/data/conversions/transducers/transducers";
import { EpisodeItem } from "@/types/api/spotify";
import { OEmbed } from "@/types/data-structures/oembed";

export const spotifyConversion = (items: EpisodeItem[]) => {
	const mapFilter = mapTransducer<EpisodeItem, EpisodeItem, EpisodeItem[]>(
		(item) => {
			return item;
		}
	);

	const sortNewDescending = createDateSortTransducer<EpisodeItem>({
		id: "release_date",
		type: "ascending",
	});

	const transducer = composeTransducers(mapFilter, sortNewDescending);
	const result = processWithTransducer(items, transducer);
	return result;
};

export const oembedConversion = (items: (OEmbed | null)[]) => {
	const validItems = items.filter((item): item is OEmbed => item !== null);

	const filterAudio = filterTransducer<OEmbed, OEmbed[]>(
		(item) => item.type !== "video"
	);
	const transducer = composeTransducers(filterAudio);
	const result = processWithTransducer(validItems, transducer);
	return result;
};
