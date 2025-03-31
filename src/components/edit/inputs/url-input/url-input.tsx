import { useFormContext } from "react-hook-form";
import styles from "./url-input.module.scss";
import { URLInputProps } from "@/types/edit/inputs/inputs";

// For x we should have a generic input
// just changing type would be enough
export const URLInput = ({
	id,
	label = "",
	defaultValue = "",
	validation = {},
	required = true,
	disabled = false,
}: URLInputProps) => {
	const { register, getValues } = useFormContext();

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
					{...register(id, { ...validation })}
					type="url"
					defaultValue={useDefault}
					required={required}
				/>
			</fieldset>
		</div>
	);
};
