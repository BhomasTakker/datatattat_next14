"use client";

import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { VideoPlayerContainer } from "../../../video-player/video-player-container";
import { Article } from "../../article/article";
import { Interaction } from "../../article/interaction/interactions";
import { InteractionsOptions } from "../../article/interaction/interactions-map";

import styles from "./video-display.module.scss";
import { useRef, useState } from "react";
import Player from "video.js/dist/types/player";

type VideoDisplayComponentProps = {
	articles: CollectionItem[];
};

export const VideoDisplayComponent = ({
	articles = [],
}: VideoDisplayComponentProps) => {
	const playerRef = useRef<Player>(null);
	const [src, setSrc] = useState(articles[0]?.src || "");

	const item = articles[0];

	const onClickHnd = (item: CollectionItem) => {
		console.log("ITEM", { item, playerRef });
		// setSrc(item.src);
		playerRef.current?.src({
			src: item.src,
			type: "video/youtube",
		});
		playerRef.current?.poster(item.avatar?.src);
	};

	return (
		<div>
			<div className={styles.videoPlayer}>
				<VideoPlayerContainer
					item={item}
					styles={styles}
					src={src}
					playerRef={playerRef}
				/>
			</div>
			<ul>
				{articles.map((item) => (
					<li key={item.title}>
						<Interaction
							key={item.title}
							type={InteractionsOptions.Click}
							onClick={() => onClickHnd(item)}
						>
							<Article article={item} styles={styles} />
						</Interaction>
					</li>
				))}
			</ul>
		</div>
	);
};
