"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import styles from "../form.module.scss";
import { createArticle } from "@/actions/cms/article";
import { initToastPromise } from "@/lib/sonner/toast";
import { CMSToastType } from "../../toast";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { ARTICLE_CREATE_CONFIG } from "../../config/article/article-create.config";
import { FormTitle } from "../title/title";

export const CreateArticleForm = () => {
	const methods = useForm();

	const submitHandler = methods.handleSubmit(async (data) => {
		initToastPromise({
			cb: () => createArticle(data as CollectionItem),
			id: CMSToastType.CreateArticle,
			onComplete: () => Promise.resolve(console.log("Article Created.")),
		});
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<FormTitle title="Create New Article" subtitle="Add a new article." />
				<InputFactory data={ARTICLE_CREATE_CONFIG} />
				<Button type="submit">Submit</Button>
				<Button type="button" onClick={() => methods.reset()}>
					Reset
				</Button>
			</form>
		</FormProvider>
	);
};
