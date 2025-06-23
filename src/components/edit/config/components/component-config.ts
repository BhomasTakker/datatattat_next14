import { GenericInput } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../inputs/inputs";
import { WITH_CONFIG } from "../query/_with-config";
import { ARTICLE_COLLECTION_CONFIG } from "./article-collection/article-collection-config";
import { OEMBED_CONFIG } from "./oembed/oembed-config";

enum ComponentOptions {
	ArticleCollection = "ArticleCollection",
	Oembed = "Oembed",
}

type componentContainersProps =
	| typeof ARTICLE_COLLECTION_CONFIG
	| typeof OEMBED_CONFIG;

const pageContainersMap = new Map<string, componentContainersProps>([
	[ComponentOptions.ArticleCollection, ARTICLE_COLLECTION_CONFIG],
	[ComponentOptions.Oembed, OEMBED_CONFIG],
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
				// resetOnChange: true,
				defaultValue: ComponentOptions.ArticleCollection,
				required: true,
				options: [ComponentOptions.ArticleCollection, ComponentOptions.Oembed],
				optionMap: pageContainersMap,
				optionId: "componentProps",
			},
		],
	},
};
