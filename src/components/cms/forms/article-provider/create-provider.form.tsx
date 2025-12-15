"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import styles from "../form.module.scss";
import { useRouter } from "next/navigation";
import { createProvider } from "@/actions/cms/provider";
import { initToastPromise } from "@/lib/sonner/toast";
import { CMSToastType } from "../../toast";
import { ProviderItem } from "@/types/data-structures/collection/item/item";
import { ARTICLE_PROVIDER_CONFIG } from "../../config/article-povider.config";
import { FormTitle } from "../title/title";

export const CreateProviderForm = () => {
	const methods = useForm();
	const router = useRouter();

	const submitHandler = methods.handleSubmit(async (data) => {
		initToastPromise({
			cb: () => createProvider(data as ProviderItem),
			id: CMSToastType.CreateArticleProvider,
			onComplete: () =>
				Promise.resolve(console.log("Article Provider Created.")),
		});
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<FormTitle
					title="Create New Article Provider"
					subtitle="Add a new provider."
				/>
				<InputFactory data={ARTICLE_PROVIDER_CONFIG} />
				<Button type="submit">Submit</Button>
			</form>
		</FormProvider>
	);
};
