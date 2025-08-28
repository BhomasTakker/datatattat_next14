import { InputListProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../../inputs/inputs";
import { getWithConfig, QueryOptions } from "../../query/_with-config";
import { OembedCollectionVariants } from "@/components/content/components/oembed-collection/variant-map";
import { OEMBED_STACK_CONFIG } from "./collections/stack/stack";
import { APIOptions } from "../../query/api/api-base-config";
import { OEMBED_MASONRY_CONFIG } from "./collections/masonry";

type oembedCollectionProps = typeof OEMBED_STACK_CONFIG;

const collectionsMap = new Map<string, oembedCollectionProps>([
	[OembedCollectionVariants.OembedStack, OEMBED_STACK_CONFIG],
	[OembedCollectionVariants.OembedMasonry, OEMBED_MASONRY_CONFIG],
]);

// there may be a better way
// Also utils this
const options = Array.from(collectionsMap.keys()).map((key) => key);

export const OEMBED_COLLECTION_CONFIG: InputListProps = {
	id: "oembedCollection",
	type: EditInputs.inputList,
	label: "Oembed Collection",

	inputs: [
		{
			id: "oembedCollectionTitle",
			type: EditInputs.title,
			title: "Oembed Collection",
		},
		{
			id: "variantType",
			type: EditInputs.objectSelect,
			label: "Article Collection Variant",
			defaultValue: "oembed-stack",
			required: true,
			options,
			optionMap: collectionsMap,
			// we are saved on comopnent props object - our parent
			optionId: undefined, // "variantProps",
		},
		getWithConfig({
			options: [QueryOptions.OEMBED_LIST, QueryOptions.API_QUERY],
			defaultSelection: QueryOptions.OEMBED_LIST,
			apiConfigOptions: {
				options: [APIOptions.BLUESKY_API],
				defaultSelection: APIOptions.BLUESKY_API,
			},
		}),
	],
};
