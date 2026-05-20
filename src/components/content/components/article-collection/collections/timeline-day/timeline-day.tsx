import styles from "./timeline-day.module.scss";
import { UnknownObject } from "@/types/utils";
import { ArticleRenderProps } from "../types";
import { TimelineDayTemplate } from "./template";
import { groupArticlesByDay, DayGroup } from "./utils";
import { InViewComponent } from "@/components/ui/in-view/in-view";
import { Interaction } from "../../article/interaction/interactions";
import { InteractionsOptions } from "../../article/interaction/interactions-map";
import { WithData } from "@/components/ui/with-data/with-data";
import { articleMetaLoader, articleRenderer, articleTemplate } from "../utils";

const renderArticle = (item: ArticleRenderProps) => {
	const { src } = item;
	const template = articleTemplate(styles);
	return (
		<InViewComponent
			key={src}
			options={{ threshold: 0, triggerOnce: true }}
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

const renderGroup = ({ label, articles }: DayGroup) => (
	<section key={label} className={styles.group}>
		<h2 className={styles.groupHeader}>{label}</h2>
		<div className={styles.articles}>
			{articles.map((item) => renderArticle(item))}
		</div>
	</section>
);

const renderMethod = (
	articles: ArticleRenderProps[] = [],
	_: UnknownObject,
) => {
	const groups = groupArticlesByDay(articles);
	return (
		<div className={styles.root}>
			{groups.map((group) => renderGroup(group))}
		</div>
	);
};

const renderTemplate = (_: UnknownObject) => {
	return <TimelineDayTemplate />;
};

const timelineDay = {
	styles,
	renderMethod,
	renderTemplate,
};

export default timelineDay;
