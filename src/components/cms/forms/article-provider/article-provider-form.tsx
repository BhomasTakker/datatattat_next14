"use client";

import { useRouter } from "next/navigation";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { updateProvider, deleteProvider } from "@/actions/cms/provider";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";

import styles from "../form.module.scss";
import { ProviderItem } from "@/types/data-structures/collection/item/item";
import { createToastAction, initToastPromise } from "@/lib/sonner/toast";
import { CMSToastType } from "../../toast";
import { ARTICLE_PROVIDER_CONFIG } from "../../config/article-povider.config";
import { FormTitle } from "../title/title";

type ArticleProviderCMSFormProps = {
	provider: ProviderItem & { _id?: string };
	disabled: boolean;
	useNavigate?: boolean;
};

export const ArticleProviderCMSForm = ({
	provider,
	disabled,
	useNavigate = false,
}: ArticleProviderCMSFormProps) => {
	const router = useRouter();
	const methods = useForm({
		defaultValues: {
			...provider,
		},
		disabled,
	});

	const submitHandler = methods.handleSubmit(async (data) => {
		initToastPromise({
			cb: () =>
				updateProvider({
					...data,
				}),
			id: CMSToastType.SaveArticleProvider,
			onComplete: (provider) =>
				console.log("Article provider saved:", provider),
		});
	});

	const deleteArticleProviderHandler = async () => {
		createToastAction({
			cb: () => deleteProvider(provider._id as string),
			id: CMSToastType.DeleteArticleProvider,
			onComplete: (_res) =>
				Promise.resolve(console.log("Article Provider Deleted.")),
			onError: (err) => console.error(err),
		});
	};

	const gotoProviderHandler = () => {
		if (provider._id) {
			router.push(`/cms/articles/providers/${provider._id}`);
		}
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<FormTitle
					title="Update Provider"
					subtitle="Modify the provider details."
				/>
				<InputFactory data={{ ...ARTICLE_PROVIDER_CONFIG }} />
				<div className={styles.buttons}>
					{!disabled && <Button type="submit">Submit</Button>}
					{!disabled && (
						<Button onClick={deleteArticleProviderHandler}>Delete</Button>
					)}
					{useNavigate && (
						<Button onClick={gotoProviderHandler}>Go To Provider</Button>
					)}
				</div>
			</form>
		</FormProvider>
	);
};
