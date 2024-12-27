import { useFormContext } from "react-hook-form";
import styles from "./select-input.module.scss";
import { SelectInputProps } from "@/types/edit/inputs/inputs";

type OptionsProps = {
	options: string[];
	required?: boolean;
};

const Options = ({ options, required }: OptionsProps) => {
	const showDefaultOption = required ? false : true;

	const defaultOption = showDefaultOption ? (
		<option key={"default-select"} value="">
			--Deselect--
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
			<label htmlFor={id}>{`Choose a ${label}:`}</label>
			<select {...register(id)} defaultValue={defaultToUse}>
				<Options options={options} required={required} />
			</select>
		</div>
	);
};
