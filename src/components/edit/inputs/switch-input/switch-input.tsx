import { useFormContext } from "react-hook-form";
import styles from "./switch-input.module.scss";
import { SwitchInputProps } from "@/types/edit/inputs/inputs";
import { FaCheck } from "react-icons/fa";

export const SwitchInput = ({
	id,
	label = "",
	defaultChecked = false,
	disabled = false,
}: SwitchInputProps) => {
	const { register } = useFormContext();

	return (
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
					disabled={disabled}
				/>
			</label>
		</div>
	);
};
