import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../../inputs/inputs";
import { STACK_COLUMNS_CONFIG } from "./collections/stack/stack-columns";
import { STACK_SCROLLER_CONFIG } from "./collections/stack/stack-scroller";
import { ArticleCollectionVariants } from "@/components/content/components/article-collection/variant-map";
import { GRID_DISPLAY } from "./collections/grid/gridDisplay";

type articleCollectionProps =
	| typeof STACK_SCROLLER_CONFIG
	| typeof STACK_COLUMNS_CONFIG;

const collectionsMap = new Map<string, articleCollectionProps>([
	[ArticleCollectionVariants.StackScroller, STACK_SCROLLER_CONFIG],
	[ArticleCollectionVariants.StackColumns, STACK_COLUMNS_CONFIG],
	[ArticleCollectionVariants.gridDisplay5, GRID_DISPLAY],
	[ArticleCollectionVariants.gridDisplay7, GRID_DISPLAY],
]);

// there may be a better way
// Also utils this
const options = Array.from(collectionsMap.keys()).map((key) => key);

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
			optionMap: collectionsMap,
			// we are saved on comopnent props object - our parent
			optionId: undefined, // "variantProps",
		},
	],
};
