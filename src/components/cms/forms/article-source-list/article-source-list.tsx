"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";

import styles from "../form.module.scss";

import { createToastAction, initToastPromise } from "@/lib/sonner/toast";
import { CMSToastType } from "../../toast";
import { ArticleSourceList } from "@/types/cms/ArticleSourceList";
import { deleteSourceList, updateSourceList } from "@/actions/cms/source-list";
import { ARTICLE_SOURCE_LIST_CONFIG } from "../../config/article-source-list.config";
import { FormTitle } from "../title/title";

// This is the correct type
// but we have used ArticleSourceList to bild the queries
// so need to refactor that at some point
type ArticleSourceListForForm = {
	sources: string[];
} & Omit<ArticleSourceList, "sources">;

type ArticleSourceListCMSFormProps = {
	list: ArticleSourceList;
};

export const ArticleSourceListCMSForm = ({
	list,
}: ArticleSourceListCMSFormProps) => {
	const methods = useForm({
		defaultValues: {
			...list,
		},
	});

	const submitHandler = methods.handleSubmit(async (data) => {
		initToastPromise({
			cb: () =>
				updateSourceList({
					...data,
				}),
			id: CMSToastType.SaveArticleSourceList,
			onComplete: (sourceList) => console.log("Source List saved:", sourceList),
		});
	});

	const deleteSourceListHandler = async () => {
		createToastAction({
			cb: () => deleteSourceList(list._id as string),
			id: CMSToastType.DeleteArticleSourceList,
			onComplete: (_res) =>
				Promise.resolve(console.log("Article Source List  == Deleted.")),
			onError: (err) => console.error(err), // launch error toast
		});
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<FormTitle
					title="Article Source List Details"
					subtitle="Modify the Source List."
				/>
				<InputFactory data={{ ...ARTICLE_SOURCE_LIST_CONFIG }} />
				<div className={styles.buttons}>
					<Button type="submit">Submit</Button>
					<Button onClick={deleteSourceListHandler}>Delete</Button>
				</div>
			</form>
		</FormProvider>
	);
};
