import { EditInputs } from "@/components/edit/inputs/inputs";
import { PARAMS } from "./params";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const HTML_META_QUERY_CONFIG: InputListProps = {
	id: "htmlMetaQuery",
	type: EditInputs.inputList,
	label: "HTML META QUERY",

	inputs: [
		{
			id: "params",
			type: EditInputs.inputList,
			label: "HTML META QUERY PARAMS",

			createObject: true,

			inputs: PARAMS,
		},
	],
};
