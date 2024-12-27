import { EditInputs } from "@/components/edit/inputs/inputs";

export type InputProps = {
	id?: string;
	type: EditInputs;
	label?: string;
	disabled?: boolean;
	required?: boolean;
};

type TextValidationOptions = {
	required?: boolean;
	maxLength?: number;
	minLength?: number;
};

type NumberValidationOptions = {
	required?: boolean;
	max?: number;
	min?: number;
};

export type TextInputProps = {
	id: string;
	type: EditInputs.text;
	defaultValue?: string;
	validation?: TextValidationOptions;
} & InputProps;

export type NumberInputProps = {
	id: string;
	type: EditInputs.number;
	defaultValue?: string;
	validation?: NumberValidationOptions;
} & InputProps;

export type SwitchInputProps = {
	id: string;
	type: EditInputs.switch;
	defaultChecked?: boolean;
} & InputProps;

// Probably just say id is required
export type TitleInputProps = {
	type: EditInputs.title;
	title: string;
	header?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	size?: "small" | "medium" | "large";
} & InputProps;

export type ShowInputProps = {
	id: string;
	type: EditInputs.show;
	label?: string;
	defaultChecked?: boolean;
	inputs: GenericInput[];
} & InputProps;

export type ArrayInputProps = {
	id: string;
	type: EditInputs.array;
	title: string;
	createObject?: boolean;
	defaultValue?: GenericInput[];
	input: GenericInput;

	canAdd?: boolean;
	canDelete?: boolean;
	canMove?: boolean;
} & InputProps;

export type InputListProps = {
	id: string;
	type: EditInputs.inputList;
	createObject?: boolean;
	inputs: GenericInput[];
} & InputProps;

export type SelectInputProps = {
	id: string;
	type: EditInputs.select;
	defaultValue?: string;
	options: string[];
	required?: boolean;
} & InputProps;

export type ObjectSelectProps = {
	id: string;
	type: EditInputs.objectSelect;
	defaultValue?: string;
	options: string[];
	optionMap: Map<string, GenericInput | null>;
	optionId?: string;
} & InputProps;

export type AssignInputIdProps = {
	id: string;
	type: EditInputs.assignId;
	assignId: string;
	input: GenericInput;
	useParent?: boolean;
} & InputProps;

type InputTypes =
	| TextInputProps
	| SwitchInputProps
	| TitleInputProps
	| ShowInputProps
	| ArrayInputProps
	| InputListProps
	| SelectInputProps
	| ObjectSelectProps
	| AssignInputIdProps
	| NumberInputProps;

export type GenericInput = InputTypes;
