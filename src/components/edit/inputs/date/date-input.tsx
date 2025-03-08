import { DateInputProps } from "@/types/edit/inputs/inputs";
import { useFormContext } from "react-hook-form";
import styles from "./date-input.module.scss";

export const DateInput = ({
	id,
	label = "",
	defaultValue = new Date(Date.now()),
	validation = {},
	required = true,
	disabled = false,
	min,
	max,
}: DateInputProps) => {
	const { register, getValues } = useFormContext();

	// we need something like this to get the default value if in form
	const useDefault = getValues(id) || defaultValue || "";

	return (
		<div className={styles.root}>
			<fieldset disabled={disabled}>
				<label htmlFor={id} className={styles.label}>
					{label}
				</label>
				<input
					className={styles.input}
					id={id}
					// this isn't validation it is options which include validation...
					{...register(id, { ...validation })}
					type="date"
					defaultValue={useDefault}
					required={required}
					min={min}
					max={max}
				/>
			</fieldset>
		</div>
	);
};
