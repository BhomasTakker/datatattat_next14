import stackScroller from "./collections/stack-scroller/stack-scroller";

type Variants = typeof stackScroller;

export enum VariantsOptions {
	StackScroller = "stack-scroller",
}

export const VariantsMap = new Map<VariantsOptions, Variants>([
	[VariantsOptions.StackScroller, stackScroller],
]);
