"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";

import styles from "../form.module.scss";

import { createToastAction, initToastPromise } from "@/lib/sonner/toast";
import { CMSToastType } from "../../toast";
import { ArticleSource } from "@/types/cms/ArticleSource";
import { deleteSource, updateSource } from "@/actions/cms/source";
import { ARTICLE_SOURCE_CONFIG } from "../../config/article-source.config";
import { FormTitle } from "../title/title";

type ArticleSourceCMSFormProps = {
	source: ArticleSource;
};

export const ArticleSourceCMSForm = ({ source }: ArticleSourceCMSFormProps) => {
	const methods = useForm({
		defaultValues: {
			...source,
		},
	});

	const submitHandler = methods.handleSubmit(async (data) => {
		initToastPromise({
			cb: () =>
				updateSource({
					...data,
				}),
			id: CMSToastType.SaveArticleSource,
			onComplete: (source) => console.log("Source saved:", source),
		});
	});

	const deleteSourceHandler = async () => {
		createToastAction({
			cb: () => deleteSource(source._id as string),
			id: CMSToastType.DeleteArticleSource,
			onComplete: (_res) =>
				Promise.resolve(console.log("Article Source == Deleted.")),
			onError: (err) => console.error(err), // launch error toast
		});
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<FormTitle
					title={`Edit Article Source: ${source.name}`}
					subtitle={`Modify the article source details: ${source._id}`}
				/>
				<InputFactory data={{ ...ARTICLE_SOURCE_CONFIG }} />
				<div className={styles.buttons}>
					<Button type="submit">Submit</Button>
					<Button onClick={deleteSourceHandler}>Delete</Button>
				</div>
			</form>
		</FormProvider>
	);
};
