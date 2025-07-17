import { EditInputs } from "@/components/edit/inputs/inputs";

import { InputListProps } from "@/types/edit/inputs/inputs";
import { PARAMS } from "./params";

export const MANUAL_VIDEO_SOURCES_QUERY_CONFIG: InputListProps = {
	id: "videoSourcesQuery",
	type: EditInputs.inputList,
	label: "Enter Video Sources",

	inputs: [
		{
			id: "params",
			type: EditInputs.inputList,
			label: "Video Sources Query",

			createObject: true,

			inputs: PARAMS,
		},
	],
};
