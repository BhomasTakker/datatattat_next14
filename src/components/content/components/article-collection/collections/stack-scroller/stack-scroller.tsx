import { CollectionItem } from "@/types/data-structures/collection/item/item";
import styles from "./stack-scroller.module.scss";
import { Article } from "../../article/article";
import { InteractionsOptions } from "../../article/interaction/interactions-map";
import { Interaction } from "../../article/interaction/interactions";

const renderArticle = (item: CollectionItem) => {
	const { src } = item;
	return (
		<Interaction
			key={item.title}
			type={InteractionsOptions.Navigate}
			href={src || ""}
		>
			<Article article={item} styles={styles} />
		</Interaction>
	);
};

const renderMethod = (articles: CollectionItem[]) => {
	return articles.map((item) => renderArticle(item));
};

const stackScroller = {
	styles,
	renderMethod,
};

export default stackScroller;
