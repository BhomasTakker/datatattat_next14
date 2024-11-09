import { PageComponent } from "@/types/page";

const ArticleCollection = ({ component }: { component: PageComponent }) => {
	console.log({ component });
	return <div>Article Collection</div>;
};

type Components = typeof ArticleCollection;

export enum ComponentsOptions {
	ArticleCollection = "ArticleCollection",
}

export const ComponentsMap = new Map<ComponentsOptions, Components>([
	[ComponentsOptions.ArticleCollection, ArticleCollection],
]);
