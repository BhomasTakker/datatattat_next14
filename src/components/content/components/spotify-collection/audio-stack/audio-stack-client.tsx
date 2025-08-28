"use client";

import { spotifyOembedByResponse } from "@/lib/api/component-data/oembed/options/spotify";
import { fetchOembed } from "@/lib/api/component-data/oembed/utils";
import { EpisodeItem } from "@/types/api/spotify";
import { JSX, useEffect, useState } from "react";
import { ClientOembed } from "../../oembed-collection/content-oembed/client-component";

type AudioStackClientProps = {
	items: EpisodeItem[];
};

type SpotifyArticleProps = {
	item: EpisodeItem;
	onClick: (index: number) => void;
	index: number;
};

const SpotifyArticle = ({ item, onClick, index }: SpotifyArticleProps) => {
	const {
		name,
		id,
		isExternallyHosted,
		description,
		external_urls,
		type,
		uri,
		html_description,
		href,
		duration_ms,
		is_playable,
		images,
	} = item;

	return (
		<article onClick={() => onClick(index)}>
			<h2>{name}</h2>
			<p>{id}</p>
			{/* <p>{html_description}</p> */}
			<p>
				{isExternallyHosted ? "Externally Hosted" : "Not Externally Hosted"}
			</p>
			<p>{duration_ms}</p>
			<p>{is_playable ? "Playable" : "Not Playable"}</p>
			<div>
				{images[0].width}
				{images[0].height}
			</div>
			<p>{external_urls.spotify}</p>
			<a href={external_urls.spotify}>Listen on Spotify</a>
		</article>
	);
};

export const AudioStackClientComponent = ({ items }: AudioStackClientProps) => {
	const [initialItem, setInitialItem] = useState(items[0]);
	const { script, createUrl } = spotifyOembedByResponse;
	const [displayComponent, setDisplayComponent] = useState<JSX.Element | null>(
		null
	);

	useEffect(() => {
		const fetchDisplayOembed = async () => {
			const result = await fetchOembed(initialItem, createUrl);
			console.log("Fetched oEmbed data:", result);

			const { html } = result;

			setDisplayComponent(<ClientOembed html={html} />);
		};
		fetchDisplayOembed();
	}, [initialItem]);

	const handleArticleClick = (index: number) => {
		setInitialItem(items[index]);
	};

	// We should convert to Article using converfsions
	const articles = items.map((item, index) => {
		return (
			<li key={item.id}>
				<SpotifyArticle
					item={item}
					onClick={handleArticleClick}
					index={index}
				/>
			</li>
		);
	});

	return (
		<div>
			{displayComponent}
			<ul>{articles}</ul>
		</div>
	);
};
