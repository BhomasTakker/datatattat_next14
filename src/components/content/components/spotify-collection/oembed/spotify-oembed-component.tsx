"use client";

import { useEffect, useRef, useState } from "react";
import { ClientOembed } from "../../oembed-collection/content-oembed/client-component";
import { OEmbed } from "@/types/data-structures/oembed";

// Spotify utils?
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

type SpotifyOembedComponentProps = { item: SpotifyOembed };
export const SpotifyOembedComponent = ({
	item,
}: SpotifyOembedComponentProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState({ width: 0, height: 0 });
	const { html = "" } = item;
	let oembedType = getOembedType(item);
	console.log(`OEmbed Type: ${oembedType}`);

	const updateSize = ["album", "artist", "playlist"].includes(oembedType || "");

	useEffect(() => {
		if (!ref.current) return;

		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				const { width, height } = entry.contentRect;
				console.log(
					`Div size changed - Width: ${width}px, Height: ${height}px`
				);
				setSize({ width, height });
			}
		});

		resizeObserver.observe(ref.current);

		// Cleanup function to disconnect observer
		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	// maybe just set height
	// apply size to html
	// available or set

	const height = Math.max(size.height, 800);
	const newHtml = html.replace(/height="\d+"/, `height="${height}"`);
	const useHtml = updateSize ? newHtml : html;

	return (
		<div ref={ref}>
			<ClientOembed html={useHtml} />
		</div>
	);
};
