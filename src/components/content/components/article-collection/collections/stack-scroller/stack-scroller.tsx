import styles from "./stack-scroller.module.scss";
import { InteractionsOptions } from "../../article/interaction/interactions-map";
import { Interaction } from "../../article/interaction/interactions";
import { UnknownObject } from "@/types/utils";
import { InViewComponent } from "@/components/ui/in-view/in-view";
import { WithData } from "@/components/ui/with-data/with-data";
import { ArticleRenderProps } from "../types";
import { articleTemplate, articleMetaLoader, articleRenderer } from "../utils";
import { ArticleTemplates } from "./template";

const renderArticle = (item: ArticleRenderProps) => {
	const { src } = item;

	const template = articleTemplate(styles);

	return (
		<InViewComponent
			key={item.src}
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
		</InViewComponent>
	);
};

const renderMethod = (
	articles: ArticleRenderProps[] = [],
	_: UnknownObject
) => {
	return articles.map((item) => renderArticle(item));
};

const renderTemplate = () => {
	return <ArticleTemplates />;
};

const stackScroller = {
	styles,
	renderMethod,
	renderTemplate,
};

export default stackScroller;
