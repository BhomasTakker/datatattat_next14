import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";
import { getWithConfig, QueryOptions } from "../../query/_with-config";

export const BLUESKY_COMPONENT_CONFIG: InputListProps = {
	id: "blueskyComponent",
	type: EditInputs.inputList,
	label: "BlueSky Component",
	inputs: [
		{
			id: "blueskyComponentTitle",
			type: EditInputs.title,
			title: "Bluesky Component",
		},
		getWithConfig([QueryOptions.API_QUERY]),
	],
};
