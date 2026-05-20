import styles from "./timeline-day.module.scss";
import { UnknownObject } from "@/types/utils";
import { ArticleRenderProps } from "../types";
import { TimelineDayTemplate } from "./template";

const renderMethod = (
	_articles: ArticleRenderProps[] = [],
	_: UnknownObject,
) => {
	return <div className={styles.root}>Timeline Day</div>;
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
