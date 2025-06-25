import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput } from "@/types/edit/inputs/inputs";
import { TWITTER_OEMBED_CONFIG } from "./providers/twitter";

const OembedVariants = {
	twitter: "twitter",
} as const;

type pageContainersProps = typeof TWITTER_OEMBED_CONFIG;

const pageContainersMap = new Map<string, pageContainersProps>([
	[OembedVariants.twitter, TWITTER_OEMBED_CONFIG],
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
		options: [OembedVariants.twitter],
		defaultValue: OembedVariants.twitter,
		required: true,
		optionMap: pageContainersMap,
	},
];
