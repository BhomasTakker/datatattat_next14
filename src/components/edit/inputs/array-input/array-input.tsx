import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

import styles from "./array-input.module.scss";
import { IconButton } from "@/components/ui/icon-button";
import { InputFactory } from "../input-factory";
import { add, move, onDelete } from "./array-input-actions";
import { randomKeyGenerator } from "@/utils/edit";
import { ArrayInputProps, GenericInput } from "@/types/edit/inputs/inputs";
import { EditContext } from "../../context/edit-context";

////////////////////////////////
// Sort types out for inputs
// generic input
type Direction = "up" | "down";

type InputWithKey = GenericInput & { key: string };
type InputList = InputWithKey[];

type InputListProps = {
	parentId: string;
	inputs: InputList;
	template: GenericInput;
	createObject: boolean;
	showControls?: boolean;
	onMove: (index: number, direction: Direction) => void;
	onDelete: (index: number) => void;
};

export const ArrayInputList = ({
	parentId,
	inputs,
	template,
	onMove,
	onDelete,
	createObject,
	showControls = true,
}: InputListProps) => {
	const { id } = template;
	return inputs.map((input, index) => {
		const inputId = createObject
			? `${parentId}.[${index}].${id}`
			: `${parentId}.[${index}]`;

		return (
			<li key={input.key} className={styles.input}>
				<InputFactory data={{ ...template, id: inputId }} />
				{showControls ? (
					<div className={styles.icons}>
						<IconButton
							data-testid="move-up"
							icon={FaArrowUp}
							onClick={() => onMove(index, "up")}
						/>
						<IconButton
							data-testid="move-down"
							icon={FaArrowDown}
							onClick={() => onMove(index, "down")}
						/>
						<IconButton
							data-testid="delete"
							icon={MdDelete}
							onClick={() => onDelete(index)}
						/>
					</div>
				) : null}
			</li>
		);
	});
};

export const ArrayInput = ({
	input,
	id,
	title,
	createObject = true,
	defaultValue = [],
	disabled = false,
}: ArrayInputProps) => {
	const { label: inputLabel, id: inputId = "" } = input;
	const { getValues, setValue, formState, handleSubmit } = useFormContext();
	const { isDirty } = formState;
	const { submitDraftHandler } = useContext(EditContext);

	const inputs: GenericInput[] = getValues(id) || defaultValue || [];

	const inputsWithUniqueKeys: InputList = inputs.map((input) => {
		return { ...input, key: randomKeyGenerator() };
	});

	const [inputList, setInputList] =
		useState<GenericInput[]>(inputsWithUniqueKeys);
	// isDirty would be better coming from the array id

	// We need to re-render the component to update the inputList
	// Whenever we move an array object, or delete
	// it should re-render the component
	// because we are updating the inputList state
	// console.log("re-rendering");
	const addInput = add({
		setValue,
		getValues,
		setInputList,
		id,
		inputId,
		createObject,
		isDirty,
		// probably something like this
	});
	const onMove = move({
		inputs: inputList,
		setValue,
		setInputList,
		id,
		isDirty,
		onDirty: handleSubmit(submitDraftHandler),
	});
	const onDeleteHnd = onDelete({
		inputs: inputList,
		setValue,
		setInputList,
		id,
		isDirty,
		onDirty: handleSubmit(submitDraftHandler),
	});

	const showControls = disabled ? false : true;

	return (
		<div className={styles.root}>
			<h2 className={styles.title}>{title}</h2>
			<ul>
				<ArrayInputList
					parentId={id}
					// This is a cheat / inputList at this point is our updated inputList
					inputs={inputList as InputList}
					template={input}
					showControls={showControls}
					onMove={onMove}
					onDelete={onDeleteHnd}
					createObject={createObject}
				/>
			</ul>

			{showControls ? (
				<Button onClick={addInput}>{`Add New ${inputLabel}`}</Button>
			) : null}
		</div>
	);
};
