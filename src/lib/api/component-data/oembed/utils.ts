import { getOembed } from "@/actions/oembed/get-oembed";
import { UnknownObject } from "@/types/utils";

export const fetchOembedList = <T = UnknownObject>(
	collection: T[],
	createUrl: (params: T) => string | undefined
) => {
	return Promise.all(
		collection.map(async (item) => {
			try {
				return await fetchOembed(item, createUrl);
			} catch (error) {
				console.error("Error fetching oEmbed:", error);
				return null;
			}
		})
	);
};

export const fetchOembed = async <T = UnknownObject>(
	item: T,
	createUrl: (params: T) => string | undefined
) => {
	const url = createUrl(item);

	if (!url) {
		return Promise.reject("No URL provided");
	}
	return await getOembed(url);
};
