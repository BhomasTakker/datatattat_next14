import { getMetadataForRoute } from "@/actions/page/page-actions";
import { Metadata as MetadataType } from "@/types/page";
import { Metadata } from "next";
import { createIcons, createOpenGraph, createTwitterCard } from "./utils";

// URL really
export const generateMetaDataFromPage = async (
	route: string,
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
		createMetaData = false,
	} = metadata;

	if (!createMetaData) {
		return {};
	}

	const openGraph = createOpenGraph(metadata);
	const twitter = createTwitterCard(metadata);

	return {
		title: pageTitle,
		description: pageDescription,
		keywords: pageKeywords,
		openGraph,
		twitter,
		// we need a fallback perhaps?
		icons: createIcons(favIcons),
	};
};
