import styles from "./timeline-day.module.scss";
import { ArticleRenderProps } from "../types";
import { TimelineDayTemplate } from "./template";
import { groupArticlesByDay, filterByDateRange, DayGroup } from "./utils";
import { InViewComponent } from "@/components/ui/in-view/in-view";
import { Interaction } from "../../article/interaction/interactions";
import { InteractionsOptions } from "../../article/interaction/interactions-map";
import { WithData } from "@/components/ui/with-data/with-data";
import { articleMetaLoader, articleRenderer, articleTemplate } from "../utils";
import { DateRangeCutoff, LabelFormat, SortOrder } from "./timeline-day.types";

export { DateRangeCutoff, LabelFormat, SortOrder };

export type TimelineDayOptions = {
	dateRangeCutoff?: DateRangeCutoff;
	labelFormat?: LabelFormat;
	maxArticlesPerGroup?: number;
	maxGroups?: number;
	showUnknownDates?: boolean;
	sortOrder?: SortOrder;
};

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

const UNKNOWN_DATE_LABEL = "Unknown date";

const renderMethod = (
	articles: ArticleRenderProps[] = [],
	{
		dateRangeCutoff = DateRangeCutoff.all,
		labelFormat = LabelFormat.short,
		maxArticlesPerGroup,
		maxGroups,
		showUnknownDates = true,
		sortOrder = SortOrder.newest,
	}: TimelineDayOptions,
) => {
	const filtered = filterByDateRange(articles, dateRangeCutoff);
	const allGroups = groupArticlesByDay(filtered, labelFormat);
	const visible = showUnknownDates
		? allGroups
		: allGroups.filter((g) => g.label !== UNKNOWN_DATE_LABEL);
	// Cap by maxGroups before reversing so we always take the N most recent days
	const capped = maxGroups ? visible.slice(0, maxGroups) : visible;
	const named = capped.filter((g) => g.label !== UNKNOWN_DATE_LABEL);
	const unknown = capped.filter((g) => g.label === UNKNOWN_DATE_LABEL);
	const groups =
		sortOrder === SortOrder.oldest
			? [...named.slice().reverse(), ...unknown]
			: capped;
	return (
		<div className={styles.root}>
			{groups.map((group) => {
				const limited = maxArticlesPerGroup
					? { ...group, articles: group.articles.slice(0, maxArticlesPerGroup) }
					: group;
				return renderGroup(limited);
			})}
		</div>
	);
};

const renderTemplate = () => {
	return <TimelineDayTemplate />;
};

const timelineDay = {
	styles,
	renderMethod,
	renderTemplate,
};

export default timelineDay;
