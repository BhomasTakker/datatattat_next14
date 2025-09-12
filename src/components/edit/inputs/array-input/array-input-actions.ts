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
	onDirty: () => void;
};

type DeleteHOCProps = {
	inputs: GenericInput[];
	onUpdate: () => void;
	setValue: UseFormSetValue<FieldValues>;
	getValues: UseFormGetValues<FieldValues>;
	setInputList: Dispatch<SetStateAction<GenericInput[]>>;
	id: string;
	isDirty: boolean;
	onDirty: () => void;
};

type MoveHOCProps = {
	inputs: GenericInput[];
	onUpdate: () => void;
	setValue: UseFormSetValue<FieldValues>;
	getValues: UseFormGetValues<FieldValues>;
	setInputList: Dispatch<SetStateAction<GenericInput[]>>;
	id: string;
	isDirty: boolean;
	onDirty: () => void;
};

export const initialise = () => {};

export const add =
	({
		setValue,
		getValues,
		setInputList,
		id,
		inputId,
		createObject,
		isDirty,
		onDirty,
	}: AddHOCProps) =>
	() => {
		const inputList: GenericInput[] = getValues(id) || [];
		onDirty();
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
	({
		inputs,
		setValue,
		getValues,
		setInputList,
		id,
		onUpdate,
		isDirty,
		onDirty,
	}: DeleteHOCProps) =>
	(index: number) => {
		onDirty();
		onUpdate();

		const inputList: GenericInput[] = getValues(id) || [];
		const newArray = inputList.filter((_, i) => index !== i);

		setValue(id, newArray);
		setInputList(newArray);
	};

export const move =
	({
		inputs, // original inputs
		setValue,
		getValues,
		onUpdate,
		setInputList,
		id,
		isDirty,
		onDirty,
	}: MoveHOCProps) =>
	(index: number, direction: Direction) => {
		const inputList: GenericInput[] = getValues(id) || [];
		if (index === 0 && direction === "up") return;
		if (index === inputList.length - 1 && direction === "down") return;

		onDirty();
		onUpdate();
		const newIndex = direction === "up" ? index - 1 : index + 1;

		const item = inputList[index];
		const removed = inputList.toSpliced(index, 1);
		const moved = removed.toSpliced(newIndex, 0, item);

		setValue(id, moved);
		setInputList(moved);
	};
