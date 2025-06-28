import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";
import { TWITTER_OEMBED_CONFIG } from "./providers/twitter";
import { BLUESKY_OEMBED_CONFIG } from "./providers/bluesky";
import { OembedOptions } from "@/lib/api/component-data/oembed/oembed-options";

type pageContainersProps =
	| typeof TWITTER_OEMBED_CONFIG
	| typeof BLUESKY_OEMBED_CONFIG;

const pageContainersMap = new Map<string, pageContainersProps>([
	[OembedOptions.twitter, TWITTER_OEMBED_CONFIG],
	[OembedOptions.bluesky, BLUESKY_OEMBED_CONFIG],
]);

export const OEMBED_PARAMS: GenericInput[] = [
	{
		id: "parameters",
		type: EditInputs.title,
		title: "Oembed Query Parameters",
	},
	{
		id: "variant",
		type: EditInputs.objectSelect,
		label: "Select Provider",
		options: [OembedOptions.twitter, OembedOptions.bluesky],
		defaultValue: OembedOptions.twitter,
		required: true,
		optionMap: pageContainersMap,
	},
];
