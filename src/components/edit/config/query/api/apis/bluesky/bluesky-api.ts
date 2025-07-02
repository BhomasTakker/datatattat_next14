import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";
import { BLUESKY_FEED } from "./feed";
import { BLUESKY_AUTHOR_FEED } from "./author-feed";
import { BLUESKY_THREAD } from "./thread";
import {
	BlueskyVariant,
	BlueskyVariantOptions,
} from "@/lib/bluesky/query/utils";

const variantMap = new Map<BlueskyVariantOptions, InputListProps>([
	[BlueskyVariant.Feed, BLUESKY_FEED],
	[BlueskyVariant.AuthorFeed, BLUESKY_AUTHOR_FEED],
	[BlueskyVariant.Thread, BLUESKY_THREAD],
]);

const PARAMS: GenericInput[] = [
	{
		id: "variant",
		type: EditInputs.objectSelect,
		label: "Select Type",
		required: true,
		options: [
			BlueskyVariant.Feed,
			BlueskyVariant.AuthorFeed,
			BlueskyVariant.Thread,
		],
		defaultValue: BlueskyVariant.Feed,
		optionMap: variantMap,
	},
];

export const BLUESKY_API_CONFIG: InputListProps = {
	id: "blueSkyApi",
	type: EditInputs.inputList,
	label: "BlueSky Search API",

	inputs: [
		{
			id: "BlueSkyApiTitle",
			type: EditInputs.title,
			title: "BlueSky Search API",
		},
		{
			id: "params",
			type: EditInputs.inputList,
			label: "API QUERY PARAMS",

			createObject: true,

			inputs: PARAMS,
		},
	],
};
