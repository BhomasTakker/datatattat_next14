import { useFormContext, useWatch } from "react-hook-form";
import { SelectInput } from "../select-input/select-input";
import { InputFactory } from "../input-factory";
import { getParentId } from "@/utils/edit";
import styles from "./object-select.module.scss";
import { ObjectSelectProps } from "@/types/edit/inputs/inputs";

export const ObjectSelect = ({
	id,
	label = "",
	defaultValue = undefined,
	options,
	optionMap,
	optionId,
	required = true,
}: Omit<ObjectSelectProps, "type">) => {
	const { getValues } = useFormContext();

	const initialValue = getValues(id) || defaultValue;

	const selectedOption = useWatch({ name: id, defaultValue: initialValue });

	const parentId = getParentId(id);
	const containerId = optionId ? `${parentId}.${optionId}` : parentId;
	const selectedObject = optionMap.get(selectedOption);

	return (
		<div className={styles.root}>
			<SelectInput
				id={id}
				label={label}
				options={options}
				required={required}
			/>
			{selectedObject ? (
				<InputFactory data={{ ...selectedObject, id: containerId }} />
			) : null}
		</div>
	);
};
