"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import styles from "../form.module.scss";
import { useRouter } from "next/navigation";
import { getSource } from "@/actions/cms/source";
import { FETCH_SOURCES_CONFIG } from "../../config/fetch-sources.config";

export const FetchSourcesCMSForm = () => {
	const methods = useForm();
	const router = useRouter();

	// Shoyuld be get sources.
	// This is  list rathe then a single item fetch.
	const submitHandler = methods.handleSubmit(async (data) => {
		const source = await getSource({
			src: data.src,
			name: data.name,
			id: data.id,
		});

		// In this instance we 'should' be able to pass the loaded article
		router.push(`/cms/articles/source/${source?._id}`);
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<h2>Fetch Sources CMS Form</h2>
				<InputFactory data={{ ...FETCH_SOURCES_CONFIG }} />
				<Button type="submit">Submit</Button>
			</form>
		</FormProvider>
	);
};
