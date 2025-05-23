import { GenericInput } from "@/types/edit/inputs/inputs";
import { randomKeyGenerator } from "@/utils/edit";
import { Dispatch, SetStateAction } from "react";
import {
	FieldValues,
	UseFormGetValues,
	UseFormSetValue,
} from "react-hook-form";

type Direction = "up" | "down";

type AddHOCProps = {
	setValue: UseFormSetValue<FieldValues>;
	getValues: UseFormGetValues<FieldValues>;
	setInputList: Dispatch<SetStateAction<GenericInput[]>>;
	id: string;
	inputId: string;
	createObject: boolean;
	isDirty: boolean;
};

type DeleteHOCProps = {
	inputs: GenericInput[];
	setValue: UseFormSetValue<FieldValues>;
	setInputList: Dispatch<SetStateAction<GenericInput[]>>;
	id: string;
	isDirty: boolean;
	onDirty: () => void;
};

type MoveHOCProps = {
	inputs: GenericInput[];
	setValue: UseFormSetValue<FieldValues>;
	setInputList: Dispatch<SetStateAction<GenericInput[]>>;
	id: string;
	isDirty: boolean;
	onDirty: () => void;
};

export const initialise = () => {};

// Not sure about create object?
// The name at least is poor
export const add =
	({
		setValue,
		getValues,
		setInputList,
		id,
		inputId,
		createObject,
		isDirty,
	}: AddHOCProps) =>
	() => {
		const inputList: GenericInput[] = getValues(id) || [];
		// we set value here to give us something to read in InputList
		// there may be a better way to do this
		if (createObject) {
			setValue(id, [
				...inputList,
				// This is creating a new InputWithId
				{ key: randomKeyGenerator(), [`${inputId}`]: "" },
			]);
		} else {
			setValue(id, [...inputList, ""]);
		}

		setInputList(getValues(id));
	};

export const onDelete =
	({ inputs, setValue, setInputList, id, isDirty, onDirty }: DeleteHOCProps) =>
	(index: number) => {
		if (isDirty) {
			onDirty();
			return;
		}
		const newArray = inputs.filter((_, i) => index !== i);
		setValue(id, newArray);
		setInputList(newArray);
	};

export const move =
	({ inputs, setValue, setInputList, id, isDirty, onDirty }: MoveHOCProps) =>
	(index: number, direction: Direction) => {
		if (isDirty) {
			onDirty();
			return;
		}
		if (index === 0 && direction === "up") return;
		if (index === inputs.length - 1 && direction === "down") return;

		// technically we should perhaps setValues
		// WITHIN the useState setter function
		// for both move and delete
		const newIndex = direction === "up" ? index - 1 : index + 1;
		const item = inputs[index];
		const removed = inputs.toSpliced(index, 1);
		const moved = removed.toSpliced(newIndex, 0, item);
		setValue(id, moved);
		setInputList(moved);
	};
