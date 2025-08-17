import { SelectInputProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../inputs/inputs";
import { containerHeightOptions, containerWidthOptions } from "./options";

export const useContainerWidth = (
	id: string,
	label: string
): SelectInputProps => {
	return {
		id,
		type: EditInputs.select,
		label,
		defaultValue: containerWidthOptions.MD,
		options: Object.values(containerWidthOptions),
	};
};

export const useContainerHeight = (
	id: string,
	label: string
): SelectInputProps => {
	return {
		id,
		type: EditInputs.select,
		label,
		defaultValue: containerHeightOptions.MD,
		options: Object.values(containerHeightOptions),
	};
};
