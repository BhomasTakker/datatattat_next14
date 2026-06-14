import styles from "../../../page.module.scss";
import { PaginatedTable } from "@/components/content/components/table/paginated-table";
import { CMSTitle } from "@/components/cms/title/cms-title";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { getPages, gotoPage } from "@/actions/cms/page";

export default async function Page() {
	await initCMSPage();

	const pages = await getPages({});

	// cms utils, cms config.
	// should be stored somewhere?
	const columns = [
		"_id",
		"route",
		"creator",
		"live",
		"pageType",
		"totalViewCount",
		"createdAt",
		"updatedAt",
	];

	return (
		<section className={styles.root}>
			<CMSTitle
				title="CMS Content Pages"
				description="Manage and organize your content pages within the CMS."
			/>
			{pages && (
				<PaginatedTable
					columns={columns}
					paginatedData={pages}
					fetchPaginatedData={getPages}
					onSelect={gotoPage}
				/>
			)}
		</section>
	);
}
