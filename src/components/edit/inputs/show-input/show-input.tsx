import { useFormContext } from "react-hook-form";
import styles from "./show-input.module.scss";
import { InputList } from "../input-list/input-list";
import { getParentId } from "@/utils/edit";
import { ShowInputProps } from "@/types/edit/inputs/inputs";
import { FaCheck } from "react-icons/fa";

export const ShowInput = ({
	id,
	label = "",
	defaultChecked = false,
	inputs = [],
}: ShowInputProps) => {
	const { register, watch } = useFormContext();

	const watchValue = watch(id);

	const renderChildren = () => {
		const parentId = getParentId(id);
		return <InputList id={parentId} inputs={inputs} type={"inputList"} />;
	};

	return (
		<div className={styles.root}>
			{/* We should just be using switch  */}
			<div className={styles.input}>
				<label className={styles.container} htmlFor={id}>
					<div className={styles.checkmark}>
						<FaCheck className={styles.icon} />
					</div>
					{label}
					<input
						id={id}
						{...register(id)}
						type="checkbox"
						defaultChecked={defaultChecked}
					/>
				</label>
			</div>
			{watchValue ? renderChildren() : null}
		</div>
	);
};
