import { CollectionItem } from "@/types/data-structures/collection/item/item";
import styles from "./stack-columns.module.scss";
import { Article } from "../../article/article";
import { InteractionsOptions } from "../../article/interaction/interactions-map";
import { Interaction } from "../../article/interaction/interactions";

// this may be the same but for styles across collections
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

// We could jut return an element
// So a Media display - that is a client component
// Because it has controls etc.
const renderMethod = (articles: CollectionItem[]) => {
	return (
		<div className={styles.container}>
			{articles.map((item) => renderArticle(item))}
		</div>
	);
};

const stackColumns = {
	styles,
	renderMethod,
};

export default stackColumns;
