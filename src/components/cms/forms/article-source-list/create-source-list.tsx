"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import styles from "../form.module.scss";
import { initToastPromise } from "@/lib/sonner/toast";
import { CMSToastType } from "../../toast";
import { FormTitle } from "../title/title";
import { ArticleSourceList } from "@/types/cms/ArticleSourceList";
import { ARTICLE_SOURCE_LIST_CONFIG } from "../../config/article-source-list.config";
import { createSourceList } from "@/actions/cms/source-list";

export const CreateSourceListForm = () => {
	const methods = useForm();

	const submitHandler = methods.handleSubmit(async (data) => {
		initToastPromise({
			cb: () => createSourceList(data as ArticleSourceList),
			id: CMSToastType.CreateArticleSourceList,
			onComplete: () =>
				Promise.resolve(console.log("Article Source List Created.")),
		});
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<FormTitle
					title="Create New Source List"
					subtitle="Add a new source list."
				/>
				<InputFactory data={ARTICLE_SOURCE_LIST_CONFIG} />
				<Button type="submit">Submit</Button>
				<Button type="button" onClick={() => methods.reset()}>
					Reset
				</Button>
			</form>
		</FormProvider>
	);
};
