import styles from "../page.module.scss";
import { PaginatedTable } from "@/components/content/components/table/paginated-table";
import { CMSTitle } from "@/components/cms/title/cms-title";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { getSources, gotoSource } from "@/actions/cms/source";
import { FetchSourcesCMSForm } from "@/components/cms/forms/article-source/fetch-sources-form";
import { getSourceLists, gotoSourceList } from "@/actions/cms/source-list";

export default async function Page() {
	await initCMSPage();

	const sourceLists = await getSourceLists({});

	const columns = ["title", "variant"];

	return (
		<section className={styles.root}>
			<CMSTitle
				title="CMS Article Sources"
				description="Manage and organize article sources"
			/>
			{sourceLists && (
				<PaginatedTable
					columns={columns}
					paginatedData={sourceLists}
					fetchPaginatedData={getSourceLists}
					onSelect={gotoSourceList}
				/>
			)}
			{/* <FetchSourcesCMSForm /> */}
		</section>
	);
}
