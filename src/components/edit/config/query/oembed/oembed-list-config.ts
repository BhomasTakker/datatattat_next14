import { EditInputs } from "@/components/edit/inputs/inputs";
import {
	ArrayInputProps,
	GenericInput,
	InputListProps,
	ObjectSelectProps,
} from "@/types/edit/inputs/inputs";
import { OembedOptions } from "@/lib/api/component-data/oembed/oembed-options";
import { BLUESKY_OEMBED_CONFIG } from "./providers/bluesky";
import { TWITTER_OEMBED_CONFIG } from "./providers/twitter";

const createOembedArray = (config: GenericInput): InputListProps => {
	return {
		id: "twitterOembedParams",
		type: EditInputs.inputList,
		label: "Twitter Oembed Parameters",

		inputs: [
			{
				id: "collection",
				title: "Collection",
				type: EditInputs.array,
				label: "Oembed Array",
				createObject: true,
				input: config,
			},
		],
	};
};

type pageContainersProps =
	| typeof TWITTER_OEMBED_CONFIG
	| typeof BLUESKY_OEMBED_CONFIG;

const pageContainersMap = new Map<string, pageContainersProps>([
	[OembedOptions.twitter, createOembedArray(TWITTER_OEMBED_CONFIG)],
	[OembedOptions.bluesky, createOembedArray(BLUESKY_OEMBED_CONFIG)],
]);

const oembedListParams: ObjectSelectProps = {
	id: "variant",
	type: EditInputs.objectSelect,
	label: "Select Provider",
	options: [OembedOptions.twitter, OembedOptions.bluesky],
	defaultValue: OembedOptions.twitter,
	required: true,
	optionMap: pageContainersMap,
};

const params: InputListProps = {
	id: "params",
	type: EditInputs.inputList,
	label: "OEMBED QUERY",

	inputs: [oembedListParams],
};

export const OEMBED_LIST_CONFIG: InputListProps = {
	id: "oembedQuery",
	type: EditInputs.inputList,
	label: "OEMBED QUERY",

	inputs: [
		{
			id: "parameters",
			type: EditInputs.title,
			title: "Oembed Query Parameters",
		},
		params,
	],
};
