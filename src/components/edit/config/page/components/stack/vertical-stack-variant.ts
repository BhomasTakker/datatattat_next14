import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";
import { useContainerHeight } from "../../../shared/content";
import { ContainerHeightOptions } from "@/components/page/components/stack/types";

export const VERTICAL_STACK: InputListProps = {
	id: "verticalStack",
	type: EditInputs.inputList,
	label: "Page Stack",

	inputs: [
		useContainerHeight("height", "Container Height", [
			ContainerHeightOptions.SM,
			ContainerHeightOptions.MD,
			ContainerHeightOptions.LG,
			ContainerHeightOptions.FULL,
		]),
	],
};
