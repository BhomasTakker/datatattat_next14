import { useFormContext } from "react-hook-form";
import styles from "./number-input.module.scss";
import { NumberInputProps } from "@/types/edit/inputs/inputs";

export const NumberInput = ({
	id,
	label = "",
	defaultValue = "",
	validation = {},
	required = true,
	disabled = false,
	min,
	max,
}: NumberInputProps) => {
	const { register, getValues } = useFormContext();

	// we need something like this to get the default value if in form
	const useDefault = getValues(id) || defaultValue || "";

	// Need to come up with error / feedback for inputs

	return (
		<div className={styles.input}>
			<fieldset disabled={disabled}>
				<label htmlFor={id}>{label}</label>
				<input
					id={id}
					{...register(id, { ...validation, min, max })}
					type="number"
					defaultValue={useDefault}
					required={required}
					min={min}
					max={max}
				/>
			</fieldset>
		</div>
	);
};
