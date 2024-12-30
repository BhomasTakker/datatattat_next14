import { EditInputs } from "@/components/edit/inputs/inputs";
import { PARAMS } from "./params";
import { RSS_CONVERSIONS } from "./conversions/conversions";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const RSS_QUERY_CONFIG: InputListProps = {
	id: "rssQuery",
	type: EditInputs.inputList,
	label: "RSS QUERY",

	inputs: [
		{
			id: "params",
			type: EditInputs.inputList,
			label: "RSS QUERY PARAMS",

			createObject: true,

			inputs: PARAMS,
		},
		{
			id: "conversions",
			type: EditInputs.inputList,
			label: "RSS QUERY CONVERSIONS",
			createObject: true,

			inputs: RSS_CONVERSIONS,
		},
	],
};
