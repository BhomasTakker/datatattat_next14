import { getMetadataForRoute } from "@/actions/page/page-actions";
import {
	IPage,
	Metadata as MetadataType,
	CardData,
	FavIcons,
} from "@/types/page";
import { Metadata } from "next";

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#opengraph
const createOpenGraph = (og: CardData) => {
	return {
		title: og.title,
		description: og.description,
		image: og.image,
		url: og.url,
		type: "website",
		locale: og.locale,
		site_name: og.site_name,
		videos: [],
		audio: [],
		images: [
			{
				url: og.image,
				alt: og["image:alt"],
			},
		],
	};
};

const createTwitterCard = (twitter: CardData) => {
	const { title, description } = twitter;
	return {
		card: "summary_large_image",
		title,
		description,
		// siteId: '1467726470533754880',
		creator: "@datatattat",
		// creatorId: '1467726470533754880',
		images: [
			{
				url: twitter.image,
				alt: twitter["image:alt"],
			},
		],
	};
};

// create robots

const createIcons = (icons: FavIcons) => {
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

// URL really
export const generateMetaDataFromPage = async (
	route: string
): Promise<Metadata> => {
	// meta type can be got by IPage['meta]
	// You may need to get mongo db etc here
	const metadata = (await getMetadataForRoute(route)) as MetadataType;
	if (!metadata) {
		return {};
	}

	const {
		pageTitle,
		pageDescription,
		pageKeywords,
		pageImage,
		favIcons = [],
		showCardData,
		cardData,
	} = metadata;

	const openGraph =
		showCardData && cardData ? createOpenGraph(cardData) : undefined;
	const twitter =
		showCardData && cardData ? createTwitterCard(cardData) : undefined;

	return {
		title: pageTitle,
		description: pageDescription,
		keywords: pageKeywords,
		// image: pageImage,
		// favicons: favIcons,
		// showCardData,
		// cardData,
		openGraph,
		twitter,
		// not working yet / we are always showing a different one
		// incorrect / we just don't have a fallback
		icons: createIcons(favIcons),
	};
};
