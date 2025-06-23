import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";
import { getWithConfig, QueryOptions } from "../../query/_with-config";

export const OEMBED_CONFIG: InputListProps = {
	id: "oembedComponent",
	type: EditInputs.inputList,
	label: "Oembed Component",
	inputs: [
		{
			id: "oembedComponentTitle",
			type: EditInputs.title,
			title: "Oembed Component",
		},
		getWithConfig([QueryOptions.NONE, QueryOptions.OEMBED]),
	],
};
