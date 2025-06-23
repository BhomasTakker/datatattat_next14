import { useFormContext } from "react-hook-form";
import styles from "./select-input.module.scss";
import { SelectInputProps } from "@/types/edit/inputs/inputs";

type OptionsProps = {
	options: string[];
	required?: boolean;
	deselectLabel?: string;
};

const Options = ({
	options,
	required = true,
	deselectLabel = "--Deselect--",
}: OptionsProps) => {
	const showDefaultOption = required ? false : true;

	const defaultOption = showDefaultOption ? (
		<option key={"default-select"} value="">
			{deselectLabel}
		</option>
	) : null;

	const optionList = options.map((value) => {
		return (
			<option key={value} value={value}>
				{value}
			</option>
		);
	});

	return (
		<>
			{defaultOption}
			{optionList}
		</>
	);
};

export const SelectInput = ({
	id,
	label = "",
	deselectLabel = "--Deselect--",
	options,
	defaultValue,
	required,
}: Omit<SelectInputProps, "type">) => {
	const { register, getValues, setValue } = useFormContext();

	const defaultToUse = getValues(id) || defaultValue || "";

	const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		// Handle any additional logic on change if needed
		// reset id to null.
		// it will reset to whatever is the stored/saved value
		// We may want the 'stored' value AND the state
		///////////////////////////////////////////////////////
		// The overall issue is that we are using the 'saved' hook-form
		// state as the ultimate truth
		// But this will not and should not update until a user SAVES
		// ****************************************************
		// We need to be able to GET changed but pre-seaved values
		setValue(id, null);
		console.log(`8989: Selected value: ${e.target.value}`);
	};

	// default value should be within the useForm - but...
	// defaultValue={defaultToUse}
	return (
		<div className={styles.root}>
			<label
				htmlFor={id}
				data-testid={"select-input-label"}
			>{`${label}`}</label>
			<select
				{...register(id)}
				defaultValue={defaultToUse}
				// onChange={onChangeHandler}
			>
				<Options
					options={options}
					required={required}
					deselectLabel={deselectLabel}
				/>
			</select>
		</div>
	);
};
