import styles from "./stack-columns.module.scss";
import { InteractionsOptions } from "../../article/interaction/interactions-map";
import { Interaction } from "../../article/interaction/interactions";
import { UnknownObject } from "@/types/utils";
import { InViewCompnent } from "@/components/ui/in-view/in-view";
import { ArticleRenderProps } from "../types";
import { WithData } from "@/components/ui/with-data/with-data";
import { articleMetaLoader, articleRenderer, articleTemplate } from "../utils";

// this may be the same but for styles across collections
const renderArticle = (item: ArticleRenderProps) => {
	const { src } = item;
	const template = articleTemplate(styles);
	return (
		<InViewCompnent
			key={item.title}
			options={{
				threshold: 0,
				triggerOnce: true,
			}}
			template={template}
		>
			<Interaction type={InteractionsOptions.Navigate} href={src || ""}>
				<WithData
					getter={articleMetaLoader(item)}
					callback={articleRenderer(styles)}
					template={template}
				/>
			</Interaction>
		</InViewCompnent>
	);
};

// We could jut return an element
// So a Media display - that is a client component
// Because it has controls etc.
const renderMethod = (articles: ArticleRenderProps[], _: UnknownObject) => {
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
