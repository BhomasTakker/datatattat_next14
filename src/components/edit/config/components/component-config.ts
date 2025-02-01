import { GenericInput } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../inputs/inputs";
import { WITH_CONFIG } from "../query/_with-config";
import { ARTICLE_COLLECTION_CONFIG } from "./article-collection/article-collection-config";

enum ComponentOptions {
	ArticleCollection = "ArticleCollection",
}

type componentContainersProps = typeof ARTICLE_COLLECTION_CONFIG;

const pageContainersMap = new Map<string, componentContainersProps>([
	[ComponentOptions.ArticleCollection, ARTICLE_COLLECTION_CONFIG],
]);

export const COMPONENT_CONFIG: GenericInput = {
	id: "components",
	type: EditInputs.array,
	label: "Components",
	title: "Add Component",
	input: {
		id: "component",
		type: EditInputs.inputList,
		label: "Component",
		// do not create a'component' object
		// i.e. create input components on parent
		createObject: false,
		inputs: [
			{
				id: "componentTitle",
				type: EditInputs.title,
				title: "Component",
				// element? h1 - 5, p, etc?
				size: "large",
				header: "h1",
			},
			{
				// technically we need this to be within component props
				// not be/create the component props object
				id: "componentType",
				type: EditInputs.objectSelect,
				label: "Source type",
				defaultValue: ComponentOptions.ArticleCollection,
				required: true,
				options: [ComponentOptions.ArticleCollection],
				optionMap: pageContainersMap,
				optionId: "componentProps",
			},
			// We may not take this approach
			// Data forst should be the way to go
			// What components are available should be based on the data
			// or what data sources are available - based on component
			WITH_CONFIG,
		],
	},
};
