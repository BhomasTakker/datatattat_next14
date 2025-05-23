import { FC } from "react";
import { InputTitle } from "./title/input-title";
import { TextInput } from "./text-input/text-input";
import { ShowInput } from "./show-input/show-input";
import { ArrayInput } from "./array-input/array-input";
import { InputList } from "./input-list/input-list";
import { SelectInput } from "./select-input/select-input";
import { ObjectSelect } from "./object-select/object-select";
import { SwitchInput } from "./switch-input/switch-input";
import { AssignInputId } from "./assignId/assign-id";
import { NumberInput } from "./number-input/number-input";
import { InputDescription } from "./description/input-description";
import { DateInput } from "./date/date-input";
import { URLInput } from "./url-input/url-input";

export enum EditInputs {
	text = "text",
	url = "url",
	switch = "switch",
	number = "number",
	textToggle = "text-toggle",
	select = "select",
	color = "color",
	objectSelect = "object-select",
	show = "show",
	array = "array",
	inputList = "input-list",
	title = "title",
	description = "description",
	indent = "indent",
	assign = "assign",
	assignId = "assignId",
	date = "date",
}

type InputComponentOptions =
	| typeof InputTitle
	| typeof TextInput
	| typeof URLInput
	| typeof ShowInput
	| typeof ArrayInput
	| typeof InputList
	| typeof SelectInput
	| typeof ObjectSelect
	| typeof SwitchInput
	| typeof AssignInputId
	| typeof NumberInput
	| typeof InputDescription
	| typeof DateInput
	| FC;

export const inputMap = new Map<EditInputs, InputComponentOptions>([
	[EditInputs.text, TextInput],
	[EditInputs.url, URLInput],
	[EditInputs.switch, SwitchInput],
	[EditInputs.number, NumberInput],
	// For toggle we can just use a wrapper around option
	// that passes a controlled value for disbled to the register option value
	[EditInputs.textToggle, () => <>text-toggle</>],
	[EditInputs.select, SelectInput],

	[EditInputs.objectSelect, ObjectSelect],

	[EditInputs.show, ShowInput],
	[EditInputs.date, DateInput],

	//////////
	[EditInputs.array, ArrayInput],
	[EditInputs.inputList, InputList],

	/////////////Not an input but a title element
	[EditInputs.title, InputTitle],
	[EditInputs.description, InputDescription],
	[EditInputs.indent, () => <>indent</>],

	// We can do this using an input
	// setting a default value
	// and disabling it
	[EditInputs.assign, () => <>assign</>],

	// bit of a hack fix
	// It is possible to get in a bit of a tizz with objectSelects, inputLists, and arrays
	// Where the id isn't properly passed down etc
	// So here we can force the thing - it's a workaround
	// And should probably call it objectAssign or something
	// As it is more of a sub object specifyer
	[EditInputs.assignId, AssignInputId],
]);
