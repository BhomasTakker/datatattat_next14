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
				{/* if collapsible / show id */}
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
				<InputFactory data={{ ...template, id: inputId }} />
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
	const [key, setKey] = useState(randomKeyGenerator());
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

	const updateKey = () => setKey(randomKeyGenerator());

	const addInput = add({
		setValue,
		getValues,
		setInputList,
		id,
		inputId,
		createObject,
		isDirty,
		// should be onAdd etc - we have removed the isDirty check
		onDirty: handleSubmit(submitDraftHandler),
	});
	const onMove = move({
		onUpdate: updateKey,
		inputs: inputList,
		setValue,
		getValues,
		setInputList,
		id,
		isDirty,
		onDirty: handleSubmit(submitDraftHandler),
	});
	const onDeleteHnd = onDelete({
		onUpdate: updateKey,
		inputs: inputList,
		setValue,
		getValues,
		setInputList,
		id,
		isDirty,
		onDirty: handleSubmit(submitDraftHandler),
	});

	const showControls = disabled ? false : true;

	return (
		<div className={styles.root} key={key}>
			<h2 className={styles.title}>{title}</h2>
			<ul>
				<ArrayInputList
					parentId={id}
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
