import { PageContent } from "@/types/page";
import {
	PageContainersMap,
	PageComponentsOptions,
} from "./page-component-factory-map";

export const PageComponentFactory = ({ content }: { content: PageContent }) => {
	const { container } = content || {};
	const { containerType } = container;

	const ContainerComponent = PageContainersMap.get(
		containerType as PageComponentsOptions
	);

	// do better error handling
	if (!ContainerComponent) {
		return <div>Component not found</div>;
	}

	return <ContainerComponent content={content} />;
};
