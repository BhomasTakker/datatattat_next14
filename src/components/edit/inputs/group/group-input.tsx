import { InputGroupProps, InputProps } from "@/types/edit/inputs/inputs";
import { getParentId } from "@/utils/edit";
import styles from "./group-input.module.scss";
import { InputFactory } from "../input-factory";

/**
 *
 * @param param0 id
 * @param param1 inputs
 * @returns InputList
 * No affect on inputs - is just a layout component to group inputs together.
 */
// Addition to allow for different sizes of inputs.
// add style={{ flexGrow: input.size ?? 1 }} to input li
export const GroupInput = ({ id: formKey, inputs }: InputGroupProps) => {
	const parentId = getParentId(formKey);
	return (
		<ul className={styles.groupLayout}>
			{inputs.map((input: InputProps) => {
				const { id } = input;
				// Could do as part of a utils function
				const inputFormId = `${parentId}.${id}`;
				const inputProps = { ...input, id: inputFormId, name: inputFormId };

				return (
					<li key={inputFormId} className={styles.input}>
						<InputFactory data={inputProps} />
					</li>
				);
			})}
		</ul>
	);
};
