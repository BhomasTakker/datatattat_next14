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

type DateValidationOptions = {
	required?: boolean;
	maxLength?: number;
	minLength?: number;
};

export type TextInputProps = {
	id: string;
	type: EditInputs.text;
	defaultValue?: string;
	validation?: TextValidationOptions;
} & InputProps;

export type URLInputProps = {
	id: string;
	type: EditInputs.url;
	defaultValue?: string;
	validation?: TextValidationOptions;
} & InputProps;

export type DateInputProps = {
	id: string;
	type: EditInputs.date;
	defaultValue?: Date;
	min?: string | number;
	max?: string | number;
	validation?: DateValidationOptions;
} & InputProps;

export type NumberInputProps = {
	id: string;
	type: EditInputs.number;
	min?: number;
	max?: number;
	step?: number;
	defaultValue?: number;
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

export type DescriptionInputProps = {
	type: EditInputs.description;
	text: string;
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

	// Default value is anything the array can hold!!!!!
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
	deselectLabel?: string;
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
	| URLInputProps
	| SwitchInputProps
	| TitleInputProps
	| ShowInputProps
	| ArrayInputProps
	| InputListProps
	| SelectInputProps
	| ObjectSelectProps
	| AssignInputIdProps
	| NumberInputProps
	| DescriptionInputProps
	| DateInputProps;

export type GenericInput = InputTypes;
