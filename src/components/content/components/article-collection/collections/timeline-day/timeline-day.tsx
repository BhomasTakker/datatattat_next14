import styles from "./timeline-day.module.scss";
import { ArticleRenderProps } from "../types";
import { TimelineDayTemplate } from "./template";
import {
	groupArticlesByDay,
	filterByDateRange,
	applySortOrder,
	DayGroup,
	UNKNOWN_DATE_LABEL,
} from "./utils";
import { InViewComponent } from "@/components/ui/in-view/in-view";
import { Interaction } from "../../article/interaction/interactions";
import { InteractionsOptions } from "../../article/interaction/interactions-map";
import { WithData } from "@/components/ui/with-data/with-data";
import { articleMetaLoader, articleRenderer, articleTemplate } from "../utils";
import { DateRangeCutoff, LabelFormat, SortOrder } from "./timeline-day.types";

export { DateRangeCutoff, LabelFormat, SortOrder };

const template = articleTemplate(styles);

export type TimelineDayOptions = {
	dateRangeCutoff?: DateRangeCutoff;
	labelFormat?: LabelFormat;
	maxArticlesPerGroup?: number;
	maxGroups?: number;
	showUnknownDates?: boolean;
	sortOrder?: SortOrder;
};

export const renderArticle = (item: ArticleRenderProps) => {
	const { src } = item;
	if (!src) return null;
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

export const renderGroup = ({ label, articles }: DayGroup) => (
	<section key={label} className={styles.group}>
		<h2 className={styles.groupHeader}>{label}</h2>
		<div className={styles.articles}>
			{articles.map((item) => renderArticle(item))}
		</div>
	</section>
);

export const getGroups = (
	articles: ArticleRenderProps[],
	{
		dateRangeCutoff = DateRangeCutoff.all,
		labelFormat = LabelFormat.short,
		maxArticlesPerGroup,
		maxGroups,
		showUnknownDates = true,
		sortOrder = SortOrder.newest,
	}: TimelineDayOptions,
): DayGroup[] => {
	const filtered = filterByDateRange(articles, dateRangeCutoff);
	const allGroups = groupArticlesByDay(filtered, labelFormat);
	const visible = showUnknownDates
		? allGroups
		: allGroups.filter((g) => g.label !== UNKNOWN_DATE_LABEL);
	// Cap by maxGroups before reversing so we always take the N most recent days
	const capped = maxGroups ? visible.slice(0, maxGroups) : visible;
	const sorted = applySortOrder(capped, sortOrder);
	return maxArticlesPerGroup
		? sorted.map((g) => ({
				...g,
				articles: g.articles.slice(0, maxArticlesPerGroup),
			}))
		: sorted;
};

const renderMethod = (
	articles: ArticleRenderProps[] = [],
	options: TimelineDayOptions,
) => (
	<div className={styles.root}>
		{getGroups(articles, options).map(renderGroup)}
	</div>
);

const renderTemplate = () => {
	return <TimelineDayTemplate />;
};

const timelineDay = {
	styles,
	renderMethod,
	renderTemplate,
};

export default timelineDay;
