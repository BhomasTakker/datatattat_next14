import gridDisplay5Styles from "./display-5.module.scss";
import gridDisplay7Styles from "./display-7.module.scss";
import { Article } from "../../article/article";
import { InteractionsOptions } from "../../article/interaction/interactions-map";
import { Interaction } from "../../article/interaction/interactions";
import { StyleSheet } from "@/types/css";
import { UnknownObject } from "@/types/utils";
import { ArticleRenderProps } from "../types";
import { GridArticleTemplates } from "./template";

// currently type and styles change between collection variants
const renderArticle = (item: ArticleRenderProps, styles: StyleSheet) => {
	const { src } = item;
	return (
		<Interaction key={src} type={InteractionsOptions.Navigate} href={src || ""}>
			<Article article={item} styles={styles} />
		</Interaction>
	);
};

const renderMethod =
	(styles: StyleSheet, num: number) =>
	(articles: ArticleRenderProps[] = [], _: UnknownObject) => {
		return articles.slice(0, num).map((item) => renderArticle(item, styles));
	};

const renderTemplate = (styles: StyleSheet, num: number) => () => {
	return <GridArticleTemplates count={num} />;
};

// you could call a function to return object based on given params
// What is the benefit though?
export const gridDisplay5 = {
	styles: gridDisplay5Styles,
	renderMethod: renderMethod(gridDisplay5Styles, 5),
	renderTemplate: renderTemplate(gridDisplay5Styles, 5),
};

export const gridDisplay7 = {
	styles: gridDisplay7Styles,
	renderMethod: renderMethod(gridDisplay7Styles, 7),
	renderTemplate: renderTemplate(gridDisplay7Styles, 7),
};
