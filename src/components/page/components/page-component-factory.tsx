import { PageContent } from "@/types/page";
import { PageContainersMap } from "./page-component-factory-map";
import { PageComponentsOptions } from "./page-component-factory-options";

export const PageComponentFactory = ({ content }: { content: PageContent }) => {
	const { containerType } = content || {};

	const ContainerComponent = PageContainersMap.get(
		containerType as PageComponentsOptions
	);

	// do better error handling
	if (!ContainerComponent) {
		return <div>Component not found</div>;
	}

	return <ContainerComponent content={content} />;
};
