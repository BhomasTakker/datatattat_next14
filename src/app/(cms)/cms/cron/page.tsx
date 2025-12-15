import styles from "../../../page.module.scss";
import { PaginatedTable } from "@/components/content/components/table/paginated-table";
import { CMSTitle } from "@/components/cms/title/cms-title";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { getCronJobs, gotoCronJob } from "@/actions/cms/cron-jobs";
import { CreateCronJobForm } from "@/components/cms/forms/cron/create-cron-form";

export default async function Page() {
	await initCMSPage();

	const cronJobs = await getCronJobs({});

	// cms utils, cms config.
	// should be stored somewhere?
	const columns = ["id", "type", "isActive", "createdAt"];

	return (
		<section className={styles.root}>
			<CMSTitle
				title="CMS Cron Jobs"
				description="Manage and organize your cron jobs within the CMS."
			/>
			{cronJobs && (
				<PaginatedTable
					columns={columns}
					paginatedData={cronJobs}
					fetchPaginatedData={getCronJobs}
					onSelect={gotoCronJob}
				/>
			)}
			<CreateCronJobForm />
		</section>
	);
}
