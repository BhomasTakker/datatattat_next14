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
import { Article } from "../../article/article";
import { DisplayArticle } from "./display-article";

type AudioDisplayComponentProps = {
	articles: CollectionItem[];
};

export const AudioDisplayComponent = ({
	articles = [],
}: AudioDisplayComponentProps) => {
	const audioPlayerRef = useRef<HTMLAudioElement>(null);
	const firstArticle = articles[0] || {};
	const src = firstArticle.src;
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
			<DisplayArticle item={item} />
			<div className={styles.audioPlayer}>
				<AudioPlayer src={activeSrc} audioPlayerRef={audioPlayerRef} />
			</div>
			<ul className={styles.articles}>
				{articles.map((item) => (
					<li key={item.title}>
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
