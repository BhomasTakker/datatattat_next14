import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

import styles from "./array-input.module.scss";
import { IconButton } from "@/components/ui/icon-button";
import { InputFactory } from "../input-factory";
import { add, move, onDelete } from "./array-input-actions";
import { randomKeyGenerator } from "@/utils/edit";
import { ArrayInputProps, GenericInput } from "@/types/edit/inputs/inputs";

////////////////////////////////
// Sort types out for inputs
// generic input
type Direction = "up" | "down";

type InputListProps = {
	parentId: string;
	inputs: GenericInput[];
	template: GenericInput;
	createObject: boolean;
	showControls?: boolean;
	onMove: (index: number, direction: Direction) => void;
	onDelete: (index: number) => void;
};

const ArrayInputList = ({
	parentId,
	inputs,
	template,
	onMove,
	onDelete,
	createObject,
	showControls = true,
}: InputListProps) => {
	const { id } = template;
	return inputs.map((_, index) => {
		const inputId = createObject
			? `${parentId}.[${index}].${id}`
			: `${parentId}.[${index}]`;

		return (
			<li key={`${randomKeyGenerator()}`} className={styles.input}>
				<InputFactory data={{ ...template, id: inputId }} />
				{showControls ? (
					<div className={styles.icons}>
						<IconButton icon={FaArrowUp} onClick={() => onMove(index, "up")} />
						<IconButton
							icon={FaArrowDown}
							onClick={() => onMove(index, "down")}
						/>
						<IconButton icon={MdDelete} onClick={() => onDelete(index)} />
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
	const { getValues, setValue } = useFormContext();

	const inputs: GenericInput[] = getValues(id) || defaultValue || [];

	const [inputList, setInputList] = useState<GenericInput[]>(inputs);

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
	});
	const onMove = move({ inputs: inputList, setValue, setInputList, id });
	const onDeleteHnd = onDelete({
		inputs: inputList,
		setValue,
		setInputList,
		id,
	});

	const showControls = disabled ? false : true;

	return (
		<div className={styles.root}>
			<h2 className={styles.title}>{title}</h2>
			<ul>
				<ArrayInputList
					parentId={id}
					inputs={inputList}
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
