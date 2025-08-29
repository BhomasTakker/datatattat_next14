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
import { CollectionItem } from "@/types/data-structures/collection/item/item";

type SpotifyCollectionItem = CollectionItem & {
	id: string;
	media: {
		type: SearchType;
	};
};

type AudioStackClientProps = {
	items: SpotifyCollectionItem[];
};

type SpotifyArticleProps = {
	item: SpotifyCollectionItem;
	onClick: (index: number) => void;
	index: number;
};

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

export const AudioStackClientComponent = ({ items }: AudioStackClientProps) => {
	const [initialItem, setInitialItem] = useState(items[0]);
	const { script, createUrl } = spotifyOembedByResponse;
	const [displayComponent, setDisplayComponent] = useState<JSX.Element | null>(
		null
	);

	useEffect(() => {
		const fetchDisplayOembed = async () => {
			const { id, media } = initialItem;

			if (!media) return;

			const result = await fetchOembed<{ id: string; type: SearchType }>(
				{ id: id, type: media.type },
				createUrl
			);

			const { html } = result;

			setDisplayComponent(<ClientOembed html={html} />);
		};
		fetchDisplayOembed();
	}, [initialItem]);

	const handleArticleClick = (index: number) => {
		setInitialItem(items[index]);
	};

	console.log("Initial item:", initialItem);

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
			<ul className={styles.articles}>{articles}</ul>
		</div>
	);
};
