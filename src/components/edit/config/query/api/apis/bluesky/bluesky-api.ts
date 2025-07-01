import { EditInputs } from "@/components/edit/inputs/inputs";
import { GenericInput, InputListProps } from "@/types/edit/inputs/inputs";
import { BLUESKY_FEED } from "./feed";
import { BLUESKY_AUTHOR_FEED } from "./author-feed";
import { BLUESKY_THREAD } from "./thread";
import { BlueskyVaraint } from "@/lib/bluesky/query/utils";

const variantMap = new Map<BlueskyVaraint, InputListProps>([
	[BlueskyVaraint.Feed, BLUESKY_FEED],
	[BlueskyVaraint.AuthorFeed, BLUESKY_AUTHOR_FEED],
	[BlueskyVaraint.Thread, BLUESKY_THREAD],
]);

const PARAMS: GenericInput[] = [
	{
		id: "variant",
		type: EditInputs.objectSelect,
		label: "Select Type",
		required: true,
		options: [
			BlueskyVaraint.Feed,
			BlueskyVaraint.AuthorFeed,
			BlueskyVaraint.Thread,
		],
		defaultValue: BlueskyVaraint.Feed,
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
