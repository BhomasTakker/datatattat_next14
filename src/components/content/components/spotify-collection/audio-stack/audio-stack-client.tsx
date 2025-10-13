"use client";

import { spotifyOembedByResponse } from "@/lib/api/component-data/oembed/options/spotify";
import { fetchOembed } from "@/lib/api/component-data/oembed/utils";
import { SearchType } from "@/types/api/spotify";
import { JSX, useEffect, useState } from "react";
import { ClientOembed } from "../../oembed-collection/content-oembed/client-component";
import { Article } from "../../article-collection/article/article";
import styles from "./audio-stack.module.scss";
import { Interaction } from "../../article-collection/article/interaction/interactions";
import { InteractionsOptions } from "../../article-collection/article/interaction/interactions-map";
import { InViewComponent } from "@/components/ui/in-view/in-view";
import { AudioStackClientProps, SpotifyArticleProps } from "./types";
import {
	ContainerHeightOptions,
	getContainerHeight,
} from "@/components/page/components/stack/types";

// this is a use client
const SpotifyArticle = ({ item, onClick, index }: SpotifyArticleProps) => {
	return (
		<InViewComponent
			options={{
				threshold: 0,
				triggerOnce: true,
			}}
			template={<div className={styles.template} />}
		>
			<Interaction
				key={item.id}
				type={InteractionsOptions.Click}
				onClick={() => onClick(index)}
			>
				<Article article={item} styles={styles} />
			</Interaction>
		</InViewComponent>
	);
};

export const AudioStackClientComponent = ({
	items,
	height = ContainerHeightOptions.MD,
}: AudioStackClientProps) => {
	const [initialItem, setInitialItem] = useState(items[0]);
	const { createUrl } = spotifyOembedByResponse;
	const [displayComponent, setDisplayComponent] = useState<JSX.Element | null>(
		null
	);

	// Could effectively create a DisplayComponent which could be client component
	useEffect(() => {
		const fetchDisplayOembed = async () => {
			try {
				const { id, media } = initialItem || {};

				if (!media) return;

				const result = await fetchOembed<{ id: string; type: SearchType }>(
					{ id: id, type: media.type },
					createUrl
				);

				const { html } = result;

				setDisplayComponent(<ClientOembed html={html} />);
			} catch (error) {
				console.error("Failed to fetch oembed data:", error);
				// Optionally set a fallback component or leave displayComponent as null
				setDisplayComponent(null);
			}
		};
		fetchDisplayOembed();
	}, [initialItem, createUrl]);

	const handleArticleClick = (index: number) => {
		setInitialItem(items[index]);
	};

	if (items.length === 0) {
		console.error("No items received");
		return null;
	}

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

	const containerHeight = getContainerHeight(height);

	return (
		<div>
			{displayComponent}
			<ul
				className={styles.articles}
				// convert to using css variables for height
				style={{ height: `${containerHeight}px` }}
			>
				{articles}
			</ul>
		</div>
	);
};
