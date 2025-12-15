"use client";

import { InputFactory } from "@/components/edit/inputs/input-factory";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";

import styles from "../form.module.scss";

import { createToastAction, initToastPromise } from "@/lib/sonner/toast";
import { CMSToastType } from "../../toast";
import { deleteCronJob, updateCronJob } from "@/actions/cms/cron-jobs";
import { CRON_JOB_CONFIG } from "../../config/cron/cron.config";
import { GenericCronConfig } from "@/types/cms/Cron";

type CronJobCMSFormProps = {
	cronJob: GenericCronConfig;
};

export const CronJobCMSForm = ({ cronJob }: CronJobCMSFormProps) => {
	const methods = useForm({
		defaultValues: {
			...cronJob,
		},
	});

	const submitHandler = methods.handleSubmit(async (data) => {
		initToastPromise({
			cb: () =>
				updateCronJob({
					...data,
				}),
			id: CMSToastType.SaveCronJob,
			onComplete: (cronJob) => console.log("Cron Job saved:", cronJob),
		});
	});

	// I don't think this is really an option for Articles
	const deleteCronJobHandler = async () => {
		createToastAction({
			cb: () => deleteCronJob(cronJob._id as string),
			id: CMSToastType.DeleteCronJob,
			onComplete: (_res) => Promise.resolve(console.log("Cron Job Deleted.")),
			onError: (err) => console.error(err), // launch error toast
		});
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={submitHandler} className={styles.form}>
				<InputFactory data={{ ...CRON_JOB_CONFIG }} />
				<div className={styles.buttons}>
					<Button type="submit">Submit</Button>
					<Button onClick={deleteCronJobHandler}>Delete</Button>
				</div>
			</form>
		</FormProvider>
	);
};
