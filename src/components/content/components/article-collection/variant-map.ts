import stackColumns from "./collections/stack-columns/stack-columns";
import stackScroller from "./collections/stack-scroller/stack-scroller";

type Variants = typeof stackScroller | typeof stackColumns;

export enum VariantsOptions {
	StackScroller = "stack-scroller",
	StackColumns = "stack-columns",
}

export const VariantsMap = new Map<VariantsOptions, Variants>([
	[VariantsOptions.StackScroller, stackScroller],
	[VariantsOptions.StackColumns, stackColumns],
]);
