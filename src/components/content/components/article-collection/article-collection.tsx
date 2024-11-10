import { PageComponent } from "@/types/page";

export const ArticleCollection = ({
	component,
}: {
	component: PageComponent;
}) => {
	console.log({ component });
	return <div>Article Collection</div>;
};
