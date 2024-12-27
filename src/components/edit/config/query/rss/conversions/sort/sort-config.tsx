import { EditInputs } from "@/components/edit/inputs/inputs";
import { SortOptions } from "@/lib/conversions/main-conversions/sort/sort-map";
import {
	AssignInputIdProps,
	GenericInput,
	InputListProps,
	TextInputProps,
} from "@/types/edit/inputs/inputs";

const keyInput: TextInputProps = {
	id: "key",
	type: EditInputs.text,
	label: "Parameter Key",
};

const keyProps: InputListProps = {
	id: "props",
	type: EditInputs.inputList,
	label: "Props",
	inputs: [keyInput],
};

type sortOptionsProps = typeof keyProps;

const sortOptionsMap = new Map<string, sortOptionsProps>([
	[SortOptions.numericDescending, keyProps],
	[SortOptions.numericAscending, keyProps],
	[SortOptions.dateTimeDescending, keyProps],
	[SortOptions.dateTimeAscending, keyProps],
]);

export const SORT_CONFIG: AssignInputIdProps = {
	id: "assignId",
	type: EditInputs.assignId,
	assignId: "id",
	input: {
		id: "id",
		type: EditInputs.objectSelect,
		label: "Conversion ID",
		required: true,
		defaultValue: SortOptions.numericDescending,
		options: [
			SortOptions.dateTimeAscending,
			SortOptions.dateTimeDescending,
			SortOptions.numericAscending,
			SortOptions.numericDescending,
		],
		optionMap: sortOptionsMap,
		optionId: "props",
	},
};
