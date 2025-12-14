import styles from "../page.module.scss";
import { PaginatedTable } from "@/components/content/components/table/paginated-table";
import { CMSTitle } from "@/components/cms/title/cms-title";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { getSources, gotoSource } from "@/actions/cms/source";
import { FetchSourcesCMSForm } from "@/components/cms/forms/article-source/fetch-sources-form";

export default async function Page() {
	await initCMSPage();

	const sources = await getSources({});

	const columns = ["name", "src", "variant"];

	return (
		<section className={styles.root}>
			<CMSTitle
				title="CMS Article Sources"
				description="Manage and organize article sources"
			/>
			{sources && (
				<PaginatedTable
					columns={columns}
					paginatedData={sources}
					fetchPaginatedData={getSources}
					onSelect={gotoSource}
				/>
			)}
			<FetchSourcesCMSForm />
		</section>
	);
}
