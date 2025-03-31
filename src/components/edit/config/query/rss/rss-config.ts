import { EditInputs } from "@/components/edit/inputs/inputs";
import { RSS_PARAMS } from "./rss-params";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const RSS_CONFIG: InputListProps = {
	id: "rssQuery",
	type: EditInputs.inputList,
	label: "RSS QUERY",

	inputs: [
		{
			id: "params",
			type: EditInputs.inputList,
			label: "RSS QUERY PARAMS",

			createObject: true,

			inputs: RSS_PARAMS,
		},
	],
};
