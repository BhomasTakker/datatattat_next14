"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { FETCH_ARTICLES_CONFIG } from "../config/fetch-articles.config";
import styles from "./form.module.scss";

export const FetchArticlesCMSForm = () => {
	const methods = useForm();

	const submitHandler = methods.handleSubmit(async (data) => {
		console.log("Save Me!", { data });
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<h2>Fetch Articles CMS Form</h2>
				<InputFactory data={{ ...FETCH_ARTICLES_CONFIG }} />
				<Button type="submit">Submit</Button>
			</form>
		</FormProvider>
	);
};
