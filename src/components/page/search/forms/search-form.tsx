"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import styles from "./search-form.module.scss";
import {
	ARTICLES_SEARCH_API_CONFIG,
	SIMPLE_SEARCH_API_CONFIG,
} from "@/components/edit/config/query/api/apis/articles-search/articles-search-api";
import { useSearchParams } from "next/navigation";

type SearchFormProps = {
	onSubmit: (event: FieldValues) => void;
	isLoading: boolean;
	isAdvanced: boolean;
};

// we will be using react-hook-form for this, but for now we will just use a simple form
export const SearchForm = ({
	onSubmit,
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

	const submitHandler = methods.handleSubmit(async (data) => {
		onSubmit(data);
	});

	const config = isAdvanced
		? ARTICLES_SEARCH_API_CONFIG
		: SIMPLE_SEARCH_API_CONFIG;

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
