import { IPage, CardData, FavIcons, Metadata } from "@/types/page";

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#opengraph
export const createOpenGraph = (og: Metadata) => {
	return {
		title: og.pageTitle,
		description: og.pageDescription,
		image: og.pageImage,
		url: og.url,
		type: "website",
		locale: og.locale,
		site_name: og.site_name,
		videos: [],
		audio: [],
		images: [
			{
				url: og.pageImage,
				alt: og["image:alt"],
			},
		],
	};
};

export const createTwitterCard = (twitter: Metadata) => {
	const { pageTitle, pageDescription } = twitter;
	// Ensure image URL is absolute
	const imageUrl = twitter.pageImage.startsWith("http")
		? twitter.pageImage
		: `https://${twitter.site_name}${twitter.pageImage}`;

	return {
		card: "summary_large_image",
		site: "@datatattat",
		title: pageTitle,
		description: pageDescription,
		creator: "@datatattat",
		images: [
			{
				url: imageUrl,
				alt: twitter["image:alt"],
			},
		],
	};
};

// create robots

export const createIcons = (icons: FavIcons) => {
	// favIcon sub object is an obvious error!
	const other = icons.map(({ favIcon }) => {
		const { rel, href, type, sizes } = favIcon;
		return {
			rel,
			url: href,
			type,
			sizes,
		};
	});

	return {
		other,
	};
};
