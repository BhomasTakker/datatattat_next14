import { SpotifyCollectionItem } from "@/components/content/components/spotify-collection/audio-stack/types";
import { mapTransducer } from "@/data/conversions/transducers/transducers";
import { EpisodeItem } from "@/types/api/spotify";

export const mapEpisodeToCollectionItem = mapTransducer<
	EpisodeItem,
	SpotifyCollectionItem,
	SpotifyCollectionItem[]
>((item) => {
	return {
		id: item.id,
		title: item.name,
		description: item.description,
		src: item.external_urls.spotify,
		guid: "",
		variant: "audio",
		createdAt: item.release_date,
		avatar: {
			src: item.images[0]?.url || "",
			alt: item.name,
		},
		details: {
			published: item.release_date,
		},
		media: {
			duration: item.duration_ms,
			mediaType: "podcast",
			type: item.type,
		},
	};
});
