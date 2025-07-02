import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";
import { getWithConfig, QueryOptions } from "../../query/_with-config";
import { APIOptions } from "../../query/api/api-base-config";

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
		// provide default
		getWithConfig({
			options: [QueryOptions.API_QUERY],
			defaultSelection: QueryOptions.API_QUERY,
			apiConfigOptions: {
				options: [APIOptions.BLUESKY_API],
				defaultSelection: APIOptions.BLUESKY_API,
			},
		}),
	],
};
