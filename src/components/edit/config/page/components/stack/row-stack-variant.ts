import { EditInputs } from "@/components/edit/inputs/inputs";
import {
	ArrayInputProps,
	DescriptionInputProps,
	GenericInput,
	InputListProps,
	TitleInputProps,
} from "@/types/edit/inputs/inputs";

const createRow = (
	id: string,
	label: string = "Row",
	addIndex: boolean = false,
	createObject: boolean = true
): InputListProps => {
	const inputs: GenericInput[] = [
		{
			id: "columns",
			type: EditInputs.number,
			label: "Columns",
			defaultValue: 1,
			max: 12,
			min: 1,
		},
		{
			id: "maxHeight",
			type: EditInputs.number,
			label: "Max Height",
			defaultValue: 100,
			max: 1000,
			min: 100,
		},
		{
			id: "minHeight",
			type: EditInputs.number,
			label: "Min Height",
			defaultValue: 100,
			max: 1000,
			min: 100,
		},
	];
	if (addIndex) {
		inputs.unshift({
			id: "index",
			type: EditInputs.number,
			label: "Index",
			defaultValue: 0,
			min: 0,
		});
	}
	return {
		id: id,
		type: EditInputs.inputList,
		label: `${label}`,
		createObject,
		inputs: inputs,
	};
};

const defaultRowTitle: TitleInputProps = {
	id: "title",
	type: EditInputs.title,
	title: "Add Default Row",
};

const defaultRowInfo: DescriptionInputProps = {
	id: "info",
	type: EditInputs.description,
	text: "This row will be added by default to the stack. For all rows not specifically configured, this will be the default.",
};

const defaultRow: InputListProps = createRow("defaultRow", "Default Row");

const rows: ArrayInputProps = {
	id: "rows",
	type: EditInputs.array,
	label: "Rows",
	title: "Add Row",
	input: createRow("row", "Row", true, false),
};

export const ROW_STACK: InputListProps = {
	id: "rowStack",
	type: EditInputs.inputList,
	label: "Page Stack",

	inputs: [defaultRowTitle, defaultRowInfo, defaultRow, rows],
};
