"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import styles from "../form.module.scss";
import { useRouter } from "next/navigation";
import { getCronJob } from "@/actions/cms/cron-jobs";
import { FETCH_CRON_CONFIG } from "../../config/cron/fetch-cron.config";

export const FetchCronJobsCMSForm = () => {
	const methods = useForm();
	const router = useRouter();

	const submitHandler = methods.handleSubmit(async (data) => {
		console.log("Fetch Cron Job Data:", data);
		const cronJob = await getCronJob({
			_id: data._id as string,
			id: data.id as string,
			name: data.name as string,
			enabled: data.enabled as boolean,
		});

		// In this instance we 'should' be able to pass the loaded article
		router.push(`/cms/cron/${cronJob?._id}`);
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<InputFactory data={{ ...FETCH_CRON_CONFIG }} />
				<Button type="submit">Submit</Button>
			</form>
		</FormProvider>
	);
};
