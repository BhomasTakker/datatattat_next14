import Head from "next/head";
import { FavIcon, renderFavIcons } from "./fav-icon/fav-icon";
import { UnknownObject } from "@/types/utils";
import { renderMeta } from "./meta/render-meta";

type HeadData = {
	pageTitle?: string;
	description?: string;
	favIcons?: FavIcon[];
	openGraph?: UnknownObject;
	twitterCard?: UnknownObject;
};

interface Props {
	headData: HeadData;
}

// Bit temp and basic but it's a start
// What do we want to control, provide control over
export const PageHead = ({ headData }: Props) => {
	const {
		pageTitle,
		description,
		favIcons = [],
		openGraph = {},
		twitterCard = {},
		// would you just show the data if there is any?
		// twitterCardShow = false,
		// openGraphShow = false,
	} = headData || {};

	return (
		<Head>
			{/* Can we get our name from somewhere please! config config config..... */}
			<title>{pageTitle || "Datatattat"}</title>
			{description ? <meta name="description" content={description} /> : null}
			{renderFavIcons({ icons: favIcons })}
			{openGraph && renderMeta({ data: openGraph })}
			{twitterCard && renderMeta({ data: twitterCard })}
		</Head>
	);
};
