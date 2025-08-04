import { PageStackCollectionVariants } from "@/types/components/page/stack";
import { verticalStack } from "./variants/vertical/vertical-stack";
import { rowStack } from "./variants/row/row-stack";

type Variants = typeof verticalStack | typeof rowStack;

export const PageStackVariantMap = new Map<
	PageStackCollectionVariants,
	Variants
>([
	[PageStackCollectionVariants.Vertical, verticalStack],
	[PageStackCollectionVariants.RowStack, rowStack],
]);
