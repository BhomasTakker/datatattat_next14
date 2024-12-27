import { useFormContext } from "react-hook-form";
import styles from "./text-input.module.scss";
import { TextInputProps } from "@/types/edit/inputs/inputs";

// default input needs formKey, required, validation, defaultValue
// potentially error message, help message/description

export const TextInput = ({
	id,
	label = "",
	defaultValue = "",
	validation = {},
	required = true,
	disabled = false,
}: TextInputProps) => {
	const { register, getValues } = useFormContext();

	// we need something like this to get the default value if in form
	const useDefault = getValues(id) || defaultValue || "";

	return (
		<div className={styles.root}>
			<label htmlFor={id} className={styles.label}>
				{label}
			</label>
			<input
				className={styles.input}
				id={id}
				// this isn't validation it is options which include validation...
				{...register(id, { ...validation })}
				type="text"
				defaultValue={useDefault}
				required={required}
				// Disabled on the element and not the form control
				// results in the value being sent as part of the form
				// i.e. This IS the form value and you vannot change it
				// You would use form disable to enable more of a 'toggle' functionality
				disabled={disabled}
				// readOnly={disabled}
			/>
		</div>
	);
};
