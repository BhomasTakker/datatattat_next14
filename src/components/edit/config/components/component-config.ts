import { GenericInput } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../inputs/inputs";
import { ARTICLE_COLLECTION_CONFIG } from "./article-collection/article-collection-config";
import { OEMBED_CONFIG } from "./oembed/oembed-config";
import { BLUESKY_COMPONENT_CONFIG } from "./bluesky/bluesky-config";

enum ComponentOptions {
	ArticleCollection = "ArticleCollection",
	Oembed = "Oembed",
	BlueSky = "BlueSky",
}

type componentContainersProps =
	| typeof ARTICLE_COLLECTION_CONFIG
	| typeof OEMBED_CONFIG;

// get from somewhere - i.e. collection?
const pageContainersMap = new Map<string, componentContainersProps>([
	[ComponentOptions.ArticleCollection, ARTICLE_COLLECTION_CONFIG],
	[ComponentOptions.Oembed, OEMBED_CONFIG],
	[ComponentOptions.BlueSky, BLUESKY_COMPONENT_CONFIG], // Assuming BlueSky uses the same component as Oembed
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
				resetOnChange: true,
				defaultValue: ComponentOptions.ArticleCollection,
				required: true,
				options: [
					ComponentOptions.ArticleCollection,
					ComponentOptions.Oembed,
					ComponentOptions.BlueSky,
				],
				optionMap: pageContainersMap,
				optionId: "componentProps",
			},
		],
	},
};
