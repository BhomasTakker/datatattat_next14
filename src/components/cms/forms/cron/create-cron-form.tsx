"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import styles from "../form.module.scss";
import { initToastPromise } from "@/lib/sonner/toast";
import { CMSToastType } from "../../toast";
import { FormTitle } from "../title/title";
import { createCronJob } from "@/actions/cms/cron-jobs";
import { GenericCronConfig } from "@/types/cms/Cron";
import { CRON_JOB_CONFIG } from "../../config/cron/cron.config";

export const CreateCronJobForm = () => {
	const methods = useForm();

	const submitHandler = methods.handleSubmit(async (data) => {
		initToastPromise({
			cb: () => createCronJob(data as GenericCronConfig),
			id: CMSToastType.CreateCronJob,
			onComplete: () => Promise.resolve(console.log("Cron Job Created.")),
		});
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<FormTitle title="Create New Cron Job" subtitle="Add a new cron job." />
				<InputFactory data={CRON_JOB_CONFIG} />
				<Button type="submit">Submit</Button>
			</form>
		</FormProvider>
	);
};
