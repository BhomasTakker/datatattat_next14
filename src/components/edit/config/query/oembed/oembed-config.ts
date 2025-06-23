import { EditInputs } from "@/components/edit/inputs/inputs";
import { OEMBED_PARAMS } from "./oembed-params";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const OEMBED_CONFIG: InputListProps = {
	id: "oembedQuery",
	type: EditInputs.inputList,
	label: "OEMBED QUERY",

	inputs: [
		{
			id: "params",
			type: EditInputs.inputList,
			label: "OEMBED QUERY PARAMS",

			createObject: true,

			inputs: OEMBED_PARAMS,
		},
	],
};
