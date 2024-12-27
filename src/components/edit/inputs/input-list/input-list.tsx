import { InputFactory } from "../input-factory";
import styles from "./input-list.module.scss";
import { getParentId } from "@/utils/edit";
import { InputListProps, InputProps } from "@/types/edit/inputs/inputs";

// should use id
// We can ssentially omit type at this point
export const InputList = ({
	id: formKey,
	inputs,
	createObject = true,
}: InputListProps) => {
	const parentId = getParentId(formKey);

	return (
		<ul className={styles.list}>
			{inputs.map((input: InputProps) => {
				const { id } = input;
				// Could do as part of a utils function
				const inputFormId = createObject
					? `${formKey}.${id}`
					: `${parentId}.${id}`;

				const inputProps = { ...input, id: inputFormId, name: inputFormId };

				return (
					<li key={inputFormId} className={styles.listItem}>
						<InputFactory data={inputProps} />
					</li>
				);
			})}
		</ul>
	);
};
