import { CollectionItem } from "@/types/data-structures/collection/item/item";
import styles from "./video-display.module.scss";
import { Interaction } from "../../article/interaction/interactions";
import { InteractionsOptions } from "../../article/interaction/interactions-map";
import { Article } from "../../article/article";

const renderVideoPlayer = (item: CollectionItem) => {
	return (
		<div key="videoPlayer" className={styles.videoPlayer}>
			<Article article={item} styles={styles} />
		</div>
	);
};

const renderArticle = (item: CollectionItem) => {
	const { src } = item;
	return (
		<li key={item.title}>
			<Interaction
				key={item.title}
				type={InteractionsOptions.Navigate}
				href={src || ""}
			>
				<Article article={item} styles={styles} />
			</Interaction>
		</li>
	);
};

const renderMethod = (articles: CollectionItem[]) => {
	return (
		<>
			{renderVideoPlayer(articles[0])}
			<ul>{articles.map((item) => renderArticle(item))}</ul>
		</>
	);
};

export const videoDisplay = {
	styles: styles,
	renderMethod: renderMethod,
};
