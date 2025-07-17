import { WithQuery } from "@/types/component";
import { Collection } from "@/types/data-structures/collection/collection";
import { CollectionItem } from "@/types/data-structures/collection/item/item";

type Params = {
	sources: ManualVideoSource[];
};

type ManualVideoSource = {
	src: string;
	type?: string;
	title?: string;
	description?: string;
	poster?: string;
};

export const getManualVideoData = (query: WithQuery) => {
	const { params } = query;
	const { sources } = params as Params;

	if (!sources || !Array.isArray(sources)) {
		console.error("Invalid sources provided for manual video data.");
		return [];
	}
	const items = sources
		.map(({ src, poster, title = "", description = "", type = "" }) => {
			if (!src) {
				console.warn("Source without src found, skipping:", src);
				return null;
			}

			return {
				src,
				title,
				guid: "",
				description,
				variant: "video",
				avatar: {
					src: poster || "",
					alt: "Video Poster",
				},
				media: {
					format: type,
				},
			} as CollectionItem;
		})
		.filter(Boolean); // Filter out any null values

	return { items } as Collection;
};
