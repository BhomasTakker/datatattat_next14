"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import styles from "../form.module.scss";
import { initToastPromise } from "@/lib/sonner/toast";
import { CMSToastType } from "../../toast";
import { FormTitle } from "../title/title";
import { createSource } from "@/actions/cms/source";
import { ArticleSource } from "@/types/cms/ArticleSource";
import { ARTICLE_SOURCE_CONFIG } from "../../config/article-source.config";

export const CreateSourceForm = () => {
	const methods = useForm();

	const submitHandler = methods.handleSubmit(async (data) => {
		initToastPromise({
			cb: () => createSource(data as ArticleSource),
			id: CMSToastType.CreateArticleSource,
			onComplete: () => Promise.resolve(console.log("Article Source Created.")),
		});
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<FormTitle
					title="Create New Article Source"
					subtitle="Add a new source."
				/>
				<InputFactory data={ARTICLE_SOURCE_CONFIG} />
				<Button type="submit">Submit</Button>
				<Button type="button" onClick={() => methods.reset()}>
					Reset
				</Button>
			</form>
		</FormProvider>
	);
};
