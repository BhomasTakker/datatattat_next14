import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../../inputs/inputs";
import { STACK_COLUMNS_CONFIG } from "./collections/stack/stack-columns";
import { STACK_SCROLLER_CONFIG } from "./collections/stack/stack-scroller";

enum articleCollectionOptions {
	StackScroller = "stack-scroller",
	Columns = "stack-columns",
}

type articleCollectionProps =
	| typeof STACK_SCROLLER_CONFIG
	| typeof STACK_COLUMNS_CONFIG;

const collectionsMap = new Map<string, articleCollectionProps>([
	[articleCollectionOptions.StackScroller, STACK_SCROLLER_CONFIG],
	[articleCollectionOptions.Columns, STACK_COLUMNS_CONFIG],
]);

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
			options: ["stack-scroller", "stack-columns"],
			optionMap: collectionsMap,
			// we are saved on comopnent props object - our parent
			optionId: undefined, // "variantProps",
		},
	],
};
