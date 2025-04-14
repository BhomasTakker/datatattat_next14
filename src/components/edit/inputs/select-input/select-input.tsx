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
	const { register, getValues } = useFormContext();

	const defaultToUse = getValues(id) || defaultValue || "";

	// default value should be within the useForm - but...
	// defaultValue={defaultToUse}
	return (
		<div className={styles.root}>
			<label htmlFor={id}>{`${label}`}</label>
			<select {...register(id)} defaultValue={defaultToUse}>
				<Options
					options={options}
					required={required}
					deselectLabel={deselectLabel}
				/>
			</select>
		</div>
	);
};
