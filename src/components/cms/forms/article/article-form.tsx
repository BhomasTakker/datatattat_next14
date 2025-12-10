"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";

import styles from "../form.module.scss";
import { ARTICLE_CONFIG } from "../../config/article.config";
import { CollectionItem } from "@/types/data-structures/collection/item/item";

import { Article } from "@/components/content/components/article-collection/article/article";
import articleStyles from "@/components/content/components/article-collection/article/article-display.module.scss";

type ArticleCMSFormProps = {
	article: CollectionItem;
};

export const ArticleCMSForm = ({ article }: ArticleCMSFormProps) => {
	const methods = useForm({
		defaultValues: {
			...article,
		},
	});

	const submitHandler = methods.handleSubmit(async (data) => {
		console.log(`Submitting data:`, data);
	});

	return (
		<FormProvider {...methods}>
			<Article article={article} styles={articleStyles} />
			<form onSubmit={submitHandler} className={styles.form}>
				<h2>Fetch Articles CMS Form</h2>
				<InputFactory data={{ ...ARTICLE_CONFIG }} />
				<Button type="submit">Submit</Button>
			</form>
		</FormProvider>
	);
};
