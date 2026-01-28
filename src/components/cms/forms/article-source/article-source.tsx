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
import { useRouter } from "next/navigation";

type ArticleSourceCMSFormProps = {
	source: ArticleSource;
	disabled?: boolean;
};

export const ArticleSourceCMSForm = ({
	source,
	disabled,
}: ArticleSourceCMSFormProps) => {
	const router = useRouter();
	const methods = useForm({
		defaultValues: {
			...source,
		},
		disabled,
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

	const gotoSourceHandler = () => {
		if (source._id) {
			router.push(`/cms/articles/source/${source._id}`);
		}
	};

	const title = !disabled
		? `Edit Article Source: ${source.name}`
		: `View Article Source: ${source.name}`;
	const subtitle = !disabled
		? `Modify the article source details: ${source._id}`
		: `Viewing the article source details: ${source._id}`;

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<FormTitle title={title} subtitle={subtitle} />
				<InputFactory data={{ ...ARTICLE_SOURCE_CONFIG }} />
				<div className={styles.buttons}>
					{!disabled && <Button type="submit">Submit</Button>}
					{!disabled && <Button onClick={deleteSourceHandler}>Delete</Button>}
					{disabled && (
						<Button onClick={gotoSourceHandler}>Go To Source</Button>
					)}
				</div>
			</form>
		</FormProvider>
	);
};
