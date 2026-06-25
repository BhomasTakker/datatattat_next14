"use client";

import {
	dynamicVariantInput,
	Variants,
} from "@/components/edit/config/query/api/apis/articles-search/variants";
import { InputFactory } from "@/components/edit/inputs/input-factory";
import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import styles from "./search-form.module.scss";
import { useEffect } from "react";

type OptionsFormProps = {
	onSubmit: (event: FieldValues) => void;
};

const OptionsConfig: InputListProps = {
	id: "optionsForm",
	type: EditInputs.inputList,
	label: "Simple Search API",
	inputs: [
		{
			id: "isAdvanced",
			type: EditInputs.switch,
			label: "Advanced Search",
			defaultChecked: false,
		},
		dynamicVariantInput({ options: [Variants.article, Variants.video] }),
	],
};

export const OptionsForm = ({ onSubmit }: OptionsFormProps) => {
	const methods = useForm({
		shouldUnregister: true,
		defaultValues: {},
	});

	useEffect(() => {
		const { unsubscribe } = methods.watch(() => {
			methods.handleSubmit((data) => onSubmit(data))();
		});
		return unsubscribe;
	}, [methods, onSubmit]);

	const submitHandler = methods.handleSubmit(async (data) => {
		onSubmit(data);
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				Add your form fields here
				<InputFactory data={OptionsConfig} />
				{/* <button type="submit">Submit</button> */}
			</form>
		</FormProvider>
	);
};
