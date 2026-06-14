"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";

import styles from "../form.module.scss";
import { initToastPromise } from "@/lib/sonner/toast";
import { CMSToastType } from "../../toast";
import { IPage } from "@/types/page";
import { syncPageArticle, updatePage } from "@/actions/cms/page";
import { PAGE_CONFIG } from "../../config/page/page.config";

type PageCMSFormProps = {
	page: IPage;
};

export const PageCMSForm = ({ page }: PageCMSFormProps) => {
	const methods = useForm({
		defaultValues: {
			...page,
		},
	});

	const submitHandler = methods.handleSubmit(async (data) => {
		initToastPromise({
			cb: () =>
				updatePage({
					...data,
				}),
			id: CMSToastType.SavePage,
			onComplete: (page) => console.log("Page saved:", page),
		});
	});

	const syncPageArticleHandler = async (page: IPage) => {
		initToastPromise({
			cb: () =>
				syncPageArticle({
					...page,
				}),
			id: CMSToastType.SyncPageArticle,
			onComplete: (page) => console.log("Page synced:", page),
		});
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<InputFactory data={{ ...PAGE_CONFIG }} />
				<div className={styles.buttons}>
					<Button type="submit">Submit</Button>
				</div>
				<div className={styles.buttons}>
					<Button onClick={() => syncPageArticleHandler(page)}>
						Sync Page Article
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};
