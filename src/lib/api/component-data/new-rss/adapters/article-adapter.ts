import { getMeta } from "@/actions/html/get-meta";
import { RSSChannelType, RSSItem } from "@/types/data-structures/rss";

const adaptItem = async (item: RSSItem) => {
	const { title, description, link, pubDate, guid, content } = item;

	// check db for existing article
	// if exists return it
	if (!link) {
		return item;
	}

	const meta = await getMeta(link);
	const {
		image,
		title: metaTitle = "",
		description: metaDescription = "",
	} = meta || {};

	// You want to save each article

	return {
		src: link,
		title: title || metaTitle,
		description: description || metaDescription,
		avatar: {
			src: image,
			alt: metaTitle,
		},
		guid,
		// provider: checkProvider()
		variant: "article",
		details: {
			published: pubDate,
		},
	};
};

export const articleAdapter = async ({
	title,
	link,
	description,
	items = [],
	image,
	feedUrl,
}: RSSChannelType) => {
	const promises = items.map((item) => {
		return adaptItem(item);
	});

	const articles = (await Promise.all(promises)) as RSSItem[];
	const collection: RSSChannelType = {
		title,
		link,
		description,
		image,
		feedUrl,
		items: articles,
	};

	// console.log("articleAdapter", collection);
	return collection;
};
