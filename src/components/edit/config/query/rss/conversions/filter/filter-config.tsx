import { EditInputs } from "@/components/edit/inputs/inputs";
import { FilterOptions } from "@/lib/conversions/main-conversions/filter/filter-map";
import {
	AssignInputIdProps,
	GenericInput,
	InputListProps,
	NumberInputProps,
	TextInputProps,
} from "@/types/edit/inputs/inputs";

const keyInput: TextInputProps = {
	id: "key",
	type: EditInputs.text,
	label: "Parameter Key",
};

const numberInput: NumberInputProps = {
	id: "n",
	type: EditInputs.number,
	label: "Number",
	required: true,
	// min, max, etc
};

const noProps: InputListProps = {
	id: "props",
	type: EditInputs.inputList,
	label: "Props",
	inputs: [],
};
const amountProps: InputListProps = {
	id: "props",
	type: EditInputs.inputList,
	label: "Props",
	inputs: [
		{
			id: "amount",
			type: EditInputs.number,
			label: "Amount",
			required: true,
		},
	],
};
const numberProps: InputListProps = {
	id: "props",
	type: EditInputs.inputList,
	label: "Props",
	inputs: [numberInput],
};

const keyProps: InputListProps = {
	id: "props",
	type: EditInputs.inputList,
	label: "Props",
	inputs: [keyInput],
};

const keyNumberProps: InputListProps = {
	id: "props",
	type: EditInputs.inputList,
	label: "Props",
	inputs: [keyInput, numberInput],
};

type filterOptionsProps =
	| typeof noProps
	| typeof keyProps
	| typeof keyNumberProps
	| typeof amountProps;

const filterOptionsMap = new Map<string, filterOptionsProps>([
	["distinct", noProps],
	["distinctKey", keyProps],
	["equals", keyNumberProps],
	["first", noProps],
	["greaterThan", keyNumberProps],
	["includes", noProps],
	["last", noProps],
	["lastN", amountProps],
	["lessThan", keyNumberProps],
	["skipLastN", amountProps],
	["skipN", amountProps],
	["topN", amountProps],
]);

export const FILTER_CONFIG: AssignInputIdProps = {
	id: "assignId",
	type: EditInputs.assignId,
	assignId: "id",
	input: {
		id: "id",
		type: EditInputs.objectSelect,
		label: "Conversion ID",
		required: true,
		options: [
			FilterOptions.distinct,
			FilterOptions.distinctKey,
			FilterOptions.equals,
			FilterOptions.first,
			FilterOptions.greaterThan,
			// FilterOptions.includes,
			FilterOptions.last,
			FilterOptions.lastN,
			FilterOptions.lessThan,
			FilterOptions.skipLastN,
			FilterOptions.skipN,
			FilterOptions.topN,
		],
		optionMap: filterOptionsMap,
	},
};
