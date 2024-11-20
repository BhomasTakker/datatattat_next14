import { CollectionItem } from "@/types/data-structures/collection/item/item";
import styles from "./stack-scroller.module.scss";
import { Article } from "../../article/article";

const renderArticle = (item: CollectionItem) => {
	return <Article article={item} styles={styles} key={item.title} />;
};

// We could jut return an element
// So a Media display - that is a client component
// Because it has controls etc.
const renderMethod = (articles: CollectionItem[]) => {
	return articles.map((item) => renderArticle(item));
};

const stackScroller = {
	styles,
	renderMethod,
};

export default stackScroller;
