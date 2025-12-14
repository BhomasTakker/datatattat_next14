import styles from "../page.module.scss";
import { FetchProvidersCMSForm } from "@/components/cms/forms/article-provider/fetch-article-provider-form";
import { getProviders, gotoProvider } from "@/actions/cms/provider";
import { PaginatedTable } from "@/components/content/components/table/paginated-table";
import { CMSTitle } from "@/components/cms/title/cms-title";
import { initCMSPage } from "@/actions/cms/init-cms-page";

export default async function Page() {
	await initCMSPage();

	const providers = await getProviders({});

	const columns = ["name", "description", "url", "rating", "origin", "leaning"];

	return (
		<section className={styles.root}>
			<CMSTitle
				title="CMS Providers"
				description="Manage and organize providers"
			/>
			{providers && (
				<PaginatedTable
					columns={columns}
					paginatedData={providers}
					fetchPaginatedData={getProviders}
					onSelect={gotoProvider}
				/>
			)}
			<FetchProvidersCMSForm />
		</section>
	);
}
