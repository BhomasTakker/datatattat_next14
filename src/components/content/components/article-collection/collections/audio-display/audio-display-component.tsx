"use client";
import { useRef, useState } from "react";
import { AudioPlayer } from "../../../audio-player/audio-player";
import styles from "./audio-display.module.scss";

import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { InViewComponent } from "@/components/ui/in-view/in-view";
import { Interaction } from "../../article/interaction/interactions";
import { InteractionsOptions } from "../../article/interaction/interactions-map";
import { articleMetaLoader, articleRenderer, articleTemplate } from "../utils";
import { WithData } from "@/components/ui/with-data/with-data";
import { DisplayArticle } from "./display-article";
import {
	AudioDisplayOptions,
	AudioVerticalScrollerSize,
} from "./audio-display";

type AudioDisplayComponentProps = {
	articles: CollectionItem[];
} & AudioDisplayOptions;

export const AudioDisplayComponent = ({
	articles = [],
	...options
}: AudioDisplayComponentProps) => {
	const audioPlayerRef = useRef<HTMLAudioElement>(null);
	const firstArticle = articles[0] || {};
	const src = firstArticle.src;
	const { size = AudioVerticalScrollerSize.medium } = options;
	// if no src then we'll need to handle that
	const [activeSrc, setActiveSrc] = useState(src);
	const template = articleTemplate(styles);
	const [item, setItem] = useState(firstArticle);

	const onClickHnd = (item: CollectionItem) => {
		const audioPlayer = audioPlayerRef.current;
		if (!audioPlayer) {
			return;
		}

		// set active article
		// store active article not src
		setItem(item);
		audioPlayer.src = item.src;
		audioPlayer.play();
	};

	return (
		<div className={styles.container}>
			{/* Display article */}
			<DisplayArticle key={item.title} item={item} />
			<div className={styles.audioPlayer} data-testid="audio-player">
				<AudioPlayer src={activeSrc} audioPlayerRef={audioPlayerRef} />
			</div>
			<ul
				className={`${styles.articles} ${styles[size]}`}
				data-testid="articles-list"
			>
				{articles.map((item) => (
					<li key={item.src}>
						<InViewComponent
							options={{
								threshold: 0,
								triggerOnce: true,
							}}
							template={<div className={styles.template} />}
						>
							<Interaction
								key={item.title}
								type={InteractionsOptions.Click}
								onClick={() => onClickHnd(item)}
							>
								{/* Remove this - we wouldn't get meta on these guys
								you have src or you dont
								 */}
								<WithData
									getter={articleMetaLoader(item)}
									callback={articleRenderer(styles)}
									template={template}
								/>
							</Interaction>
						</InViewComponent>
					</li>
				))}
			</ul>
		</div>
	);
};
