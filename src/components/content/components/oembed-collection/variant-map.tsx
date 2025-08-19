// we culd do this bette

import oembedStack from "./collections/stack/stack";

// type is only different in the renderMethod - JSX.Element & JSX.Element[]
type Variants = typeof oembedStack;

export enum OembedCollectionVariants {
	OembedStack = "oembed-stack",
}

export const VariantsMap = new Map<OembedCollectionVariants, Variants>([
	[OembedCollectionVariants.OembedStack, oembedStack],
]);
