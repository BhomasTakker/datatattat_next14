import { CollectionItem } from "@/types/data-structures/collection/item/item";
import styles from "./stack-scroller.module.scss";
import { Article } from "../../article/article";
import { InteractionsOptions } from "../../article/interaction/interactions-map";
import { Interaction } from "../../article/interaction/interactions";
import { UnknownObject } from "@/types/utils";
import { InViewCompnent } from "@/components/ui/in-view/in-view";

const renderArticle = (item: CollectionItem) => {
	const { src } = item;
	return (
		<InViewCompnent
			key={item.title}
			options={{
				threshold: 0,
				triggerOnce: true,
			}}
			template={<div className={styles.template} />}
		>
			<Interaction type={InteractionsOptions.Navigate} href={src || ""}>
				<Article article={item} styles={styles} />
			</Interaction>
		</InViewCompnent>
	);
};

const renderMethod = (articles: CollectionItem[], _: UnknownObject) => {
	return articles.map((item) => renderArticle(item));
};

const stackScroller = {
	styles,
	renderMethod,
};

export default stackScroller;
