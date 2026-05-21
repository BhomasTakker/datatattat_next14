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
	const { register, watch } = useFormContext();
	const savedValue = watch(id);
	const isChecked =
		savedValue !== undefined ? Boolean(savedValue) : defaultChecked;

	return (
		<div className={styles.input}>
			<fieldset disabled={disabled}>
				<label className={styles.container} htmlFor={id}>
					<div className={styles.checkmark}>
						<FaCheck className={styles.icon} />
					</div>
					{label}
					<input
						id={id}
						{...register(id)}
						type="checkbox"
						checked={isChecked}
					/>
				</label>
			</fieldset>
		</div>
	);
};
