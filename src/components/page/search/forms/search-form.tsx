"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import styles from "./search-form.module.scss";
import { useSearchParams } from "next/navigation";
import { InputListProps } from "@/types/edit/inputs/inputs";
import { useEffect } from "react";

type SearchFormProps = {
	onSubmit: (event: FieldValues) => void;
	onChange: (variant: "article" | "video") => void;
	config: InputListProps;
	isLoading: boolean;
	isAdvanced: boolean;
};

// we will be using react-hook-form for this, but for now we will just use a simple form
export const SearchForm = ({
	onSubmit,
	onChange,
	config,
	isLoading,
	isAdvanced,
}: SearchFormProps) => {
	const params = useSearchParams();

	const methods = useForm({
		shouldUnregister: true,
		defaultValues: {
			articlesSearchApi: {
				params: {
					...Object.fromEntries(params.entries()),
				},
			},
		},
	});

	const variant = methods.watch("articlesSearchApi.params.variant") as
		| "article"
		| "video";

	const submitHandler = methods.handleSubmit(async (data) => {
		onSubmit(data);
	});

	useEffect(() => {
		if (variant) {
			onChange(variant);
		}
	}, [variant, onChange]);

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<InputFactory data={{ ...config }} />
				<Button type="submit" disabled={isLoading}>
					Search
				</Button>
			</form>
		</FormProvider>
	);
};
