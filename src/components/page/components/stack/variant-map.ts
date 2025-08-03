import { PageStackCollectionVariants } from "@/types/components/page/stack";
import { verticalStack } from "./variants/vertical/vertical-stack";

type Variants = typeof verticalStack;

export const PageStackVariantMap = new Map<
	PageStackCollectionVariants,
	Variants
>([
	[PageStackCollectionVariants.Vertical, verticalStack],
	// [PageStackCollectionVariants.RowStack, 'RowStack'],
]);
