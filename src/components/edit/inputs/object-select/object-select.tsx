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
	resetOnChange = false,
	required = true,
}: Omit<ObjectSelectProps, "type">) => {
	const { getValues, setValue, unregister } = useFormContext();

	const initialValue = getValues(id) || defaultValue;

	const selectedOption = useWatch({ name: id, defaultValue: initialValue });

	const parentId = getParentId(id);
	const containerId = optionId ? `${parentId}.${optionId}` : parentId;
	const selectedObject = optionMap.get(selectedOption);

	// this certainly isn't perfect
	// but we may be getting snagged on a separate issue
	const onChangeHnd = () => {
		if (!resetOnChange) return;

		unregister(containerId, {
			keepDefaultValue: false,
			keepDirty: false,
			keepDirtyValues: false,
		});
	};

	return (
		<div className={styles.root}>
			<SelectInput
				id={id}
				label={label}
				options={options}
				required={required}
				onChange={onChangeHnd}
			/>
			{selectedObject ? (
				<div key={selectedOption}>
					<InputFactory data={{ ...selectedObject, id: containerId }} />
				</div>
			) : null}
		</div>
	);
};
