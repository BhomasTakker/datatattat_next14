"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";

import styles from "../form.module.scss";
import { ARTICLE_CONFIG } from "../../config/article.config";
import { CollectionItem } from "@/types/data-structures/collection/item/item";

import { Article } from "@/components/content/components/article-collection/article/article";
import articleStyles from "@/components/content/components/article-collection/article/article-display.module.scss";
import { createToastAction, initToastPromise } from "@/lib/sonner/toast";
import { CMSToastType } from "../../toast";
import { deleteArticle, updateArticle } from "@/actions/cms/article";

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
		initToastPromise({
			cb: () =>
				updateArticle({
					...data,
				}),
			id: CMSToastType.SaveArticle,
			onComplete: (article) => console.log("Article saved:", article),
		});
	});

	// I don't think this is really an option for Articles
	const deleteArticleHandler = async () => {
		console.log(`Deleting article with id: ${article._id}`);
		createToastAction({
			cb: () => deleteArticle(article._id as string),
			id: CMSToastType.DeleteArticle,
			onComplete: (_res) => Promise.resolve(console.log("Article Deleted.")),
			onError: (err) => console.error(err), // launch error toast
		});
	};

	return (
		<FormProvider {...methods}>
			<Article article={article} styles={articleStyles} />
			<form onSubmit={submitHandler} className={styles.form}>
				<h2>Fetch Articles CMS Form</h2>
				<InputFactory data={{ ...ARTICLE_CONFIG }} />
				<div className={styles.buttons}>
					<Button type="submit">Submit</Button>
					<Button onClick={deleteArticleHandler}>Delete</Button>
				</div>
			</form>
		</FormProvider>
	);
};
