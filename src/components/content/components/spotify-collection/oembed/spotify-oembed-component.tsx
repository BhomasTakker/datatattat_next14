import { ClientOembed } from "../../oembed-collection/content-oembed/client-component";
import { OEmbed } from "@/types/data-structures/oembed";
import {
	ContainerHeightOptions,
	getContainerHeight,
} from "@/components/page/components/stack/types";

const getOembedType = (item: SpotifyOembed) => {
	const { iframe_url = "" } = item;
	let oembedType;

	switch (true) {
		case iframe_url.includes("embed/album"):
			oembedType = "album";
			break;
		case iframe_url.includes("embed/artist"):
			oembedType = "artist";
			break;
		case iframe_url.includes("embed/track"):
			oembedType = "track";
			break;
		case iframe_url.includes("embed/show"):
			oembedType = "show";
			break;
		case iframe_url.includes("embed/playlist"):
			oembedType = "playlist";
			break;
		case iframe_url.includes("embed/episode"):
			oembedType = "episode";
			break;
	}

	return oembedType;
};

type SpotifyOembed = {
	iframe_url: string;
} & OEmbed;

type SpotifyOembedComponentProps = {
	item: SpotifyOembed;
	height: ContainerHeightOptions;
};

export const SpotifyOembedComponent = ({
	item,
	height = ContainerHeightOptions.MD,
}: SpotifyOembedComponentProps) => {
	const { html = "" } = item;
	let oembedType = getOembedType(item);

	const updateSize = ["album", "artist", "playlist"].includes(oembedType || "");

	const containerHeight = getContainerHeight(height);

	const newHtml = html.replace(/height="\d+"/, `height="${containerHeight}"`);
	const useHtml = updateSize ? newHtml : html;

	return (
		<div>
			<ClientOembed html={useHtml} />
		</div>
	);
};
