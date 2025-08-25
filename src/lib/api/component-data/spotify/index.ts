import { search } from "./query/search";
import { fetchOembedList } from "@/lib/api/component-data/oembed/utils";
import { OEmbed } from "@/types/data-structures/oembed";
import { SpotifyVariant } from "./query/utils";
import { spotifyOembedByResponse } from "../oembed/options/spotify";
import { EpisodeItem, SearchParams } from "@/types/api/spotify";
import {
	composeTransducers,
	processWithTransducer,
} from "../../../../data/conversions";
import {
	sortTransducer,
	mapTransducer,
	filterTransducer,
} from "@/data/conversions/transducers/transducers";

type SpotifyFetchParams = {
	variant?: SpotifyVariant; // Type of query to perform
	feed?: string; // Feed URI
	actor?: string; // Author DID
	uri?: string; // Post URI
	cursor?: string; // Cursor for pagination
	limit?: number; // Number of posts to fetch
	depth?: number; // Depth of replies to fetch
	parentHeight?: number; // Height of the parent post
};

const createDateSortTransducer = ({
	id,
	type,
}: {
	id: Partial<keyof EpisodeItem>;
	type: "ascending" | "descending";
}) =>
	sortTransducer<EpisodeItem>((a, b) => {
		return type === "ascending"
			? Date.parse(String(a[id])) - Date.parse(String(b[id]))
			: Date.parse(String(b[id])) - Date.parse(String(a[id]));
	});

const spotifyConversion = (items: EpisodeItem[]) => {
	const mapFilter = mapTransducer<EpisodeItem, EpisodeItem, EpisodeItem[]>(
		(item) => {
			return item;
		}
	);

	const sortNewDescending = createDateSortTransducer({
		id: "release_date",
		type: "ascending",
	});

	const transducer = composeTransducers(mapFilter, sortNewDescending);
	const result = processWithTransducer(items, transducer);
	return result;
};

const oembedConversion = (items: (OEmbed | null)[]) => {
	const validItems = items.filter((item): item is OEmbed => item !== null);

	const filterAudio = filterTransducer<OEmbed, OEmbed[]>(
		(item) => item.type !== "video"
	);
	const transducer = composeTransducers(filterAudio);
	const result = processWithTransducer(validItems, transducer);
	return result;
};

export const spotifyFetch = async (params: SpotifyFetchParams) => {
	const { variant = SpotifyVariant.Search, ...fetchParams } = params;

	let items: EpisodeItem[] = [];

	switch (variant) {
		case SpotifyVariant.Search:
			{
				items = await search(fetchParams as SearchParams);
			}
			break;
		default:
			items = [];
	}

	const { script, createUrl } = spotifyOembedByResponse;

	// filter
	const filteredItems = spotifyConversion(items);

	// Elsewhere function / oembed load etc
	const results = await fetchOembedList(filteredItems, createUrl);

	const filteredResults = oembedConversion(results);

	return {
		items: filteredResults,
		script: script,
	};
};
