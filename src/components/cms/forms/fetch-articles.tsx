"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { FETCH_ARTICLES_CONFIG } from "../config/fetch-articles.config";
import styles from "./form.module.scss";
import { getArticle } from "@/actions/cms/article";

export const FetchArticlesCMSForm = () => {
	const methods = useForm();

	const submitHandler = methods.handleSubmit(async (data) => {
		const article = await getArticle({
			src: data.src,
			title: data.title,
			id: data.id,
		});
		console.log("Fetched Article:", article);
		console.log("Article ID: ", article?._id);
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
