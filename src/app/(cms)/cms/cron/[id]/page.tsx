import styles from "../../../../page.module.scss";
import { redirect } from "next/navigation";
import { CMSTitle } from "@/components/cms/title/cms-title";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { getCronJob } from "@/actions/cms/cron-jobs";
import { CronJobCMSForm } from "@/components/cms/forms/cron/cron-form";

type Params = Promise<{ id: string }>;
type Props = {
	params: Params;
};

export default async function Page({ params }: Props) {
	await initCMSPage();

	const { id } = await params;

	const cronJob = await getCronJob({
		_id: id,
	});

	if (!cronJob?._id) {
		redirect("/cms/cron");
	}

	const { id: cronJobId } = cronJob;

	return (
		<section className={styles.root}>
			<CMSTitle title={`Cron Job: ${cronJobId}`} />
			<CronJobCMSForm cronJob={cronJob} />
		</section>
	);
}
