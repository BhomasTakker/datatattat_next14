import oembedMasonry from "./collections/masonry/masonry";
import oembedStack from "./collections/stack/stack";

// type is only different in the renderMethod - JSX.Element & JSX.Element[]
type Variants = typeof oembedStack | typeof oembedMasonry;

export enum OembedCollectionVariants {
	OembedStack = "oembed-stack",
	OembedMasonry = "oembed-masonry",
}

export const VariantsMap = new Map<OembedCollectionVariants, Variants>([
	[OembedCollectionVariants.OembedStack, oembedStack],
	[OembedCollectionVariants.OembedMasonry, oembedMasonry],
]);
