"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import styles from "../form.module.scss";
import { useRouter } from "next/navigation";
import { getProvider } from "@/actions/cms/provider";
import { FETCH_PROVIDERS_CONFIG } from "../../config/fetch-providers.config";

export const FetchProvidersCMSForm = () => {
	const methods = useForm();
	const router = useRouter();

	const submitHandler = methods.handleSubmit(async (data) => {
		console.log("Fetching provider with data:", data);

		const provider = await getProvider({
			url: data.url,
			name: data.name,
			id: data.id,
		});

		// In this instance we 'should' be able to pass the loaded article
		router.push(`/cms/articles/providers/${provider?._id}`);
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<h2>Fetch Providers CMS Form</h2>
				<InputFactory data={{ ...FETCH_PROVIDERS_CONFIG }} />
				<Button type="submit">Submit</Button>
			</form>
		</FormProvider>
	);
};
