import { SelectInputProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../inputs/inputs";
import {
	ContainerHeightOptions,
	ContainerWidthOptions,
} from "@/components/page/components/stack/types";

const filterOptions = (includes: string[], options: Record<string, string>) => {
	return Object.values(options).filter((option) => includes.includes(option));
};

export const useContainerWidth = (
	id: string,
	label: string,
	includes: string[] = Object.values(ContainerWidthOptions)
): SelectInputProps => {
	return {
		id,
		type: EditInputs.select,
		label,
		defaultValue: ContainerWidthOptions.MD,
		options: filterOptions(includes, ContainerWidthOptions),
	};
};

export const useContainerHeight = (
	id: string,
	label: string,
	includes: string[] = Object.values(ContainerHeightOptions)
): SelectInputProps => {
	return {
		id,
		type: EditInputs.select,
		label,
		defaultValue: ContainerHeightOptions.MD,
		options: filterOptions(includes, ContainerHeightOptions),
	};
};
