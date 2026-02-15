import { InputListProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../../inputs/inputs";
import { articleCollectionsMap } from "./structs";

const options = Array.from(articleCollectionsMap.keys()).map((key) => key);

export const ARTICLE_COLLECTION_CONFIG: InputListProps = {
	id: "articleCollection",
	type: EditInputs.inputList,
	label: "Article Collection",

	inputs: [
		{
			id: "articleCollectionTitle",
			type: EditInputs.title,
			title: "Article Collection",
		},
		{
			id: "variantType",
			type: EditInputs.objectSelect,
			label: "Article Collection Variant",
			defaultValue: "stack-scroller",
			required: true,
			options,
			optionMap: articleCollectionsMap,
			// we are saved on comopnent props object - our parent
			optionId: undefined, // "variantProps",
		},
	],
};
