import { gridDisplay5, gridDisplay7 } from "./collections/grid-display/display";
import stackColumns from "./collections/stack-columns/stack-columns";
import stackScroller from "./collections/stack-scroller/stack-scroller";

// we culd do this bette
// type is only different in the renderMethod - JSX.Element & JSX.Element[]
type Variants =
	| typeof stackScroller
	| typeof stackColumns
	| typeof gridDisplay5
	| typeof gridDisplay7;

export enum ArticleCollectionVariants {
	StackScroller = "stack-scroller",
	StackColumns = "stack-columns",
	gridDisplay5 = "grid-display-5",
	gridDisplay7 = "grid-display-7",
}

export const VariantsMap = new Map<ArticleCollectionVariants, Variants>([
	[ArticleCollectionVariants.StackScroller, stackScroller],
	[ArticleCollectionVariants.StackColumns, stackColumns],
	[ArticleCollectionVariants.gridDisplay5, gridDisplay5],
	[ArticleCollectionVariants.gridDisplay7, gridDisplay7],
]);
