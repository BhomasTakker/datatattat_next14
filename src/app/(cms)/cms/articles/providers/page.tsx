import styles from "../page.module.scss";
import { FetchProvidersCMSForm } from "@/components/cms/forms/article-provider/fetch-article-provider-form";
import { getProviders, gotoProvider } from "@/actions/cms/provider";
import { PaginatedTable } from "@/components/content/components/table/paginated-table";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { CreateProviderForm } from "@/components/cms/forms/article-provider/create-provider.form";
import { PageTitle } from "@/components/ui/typography/title/page-title";
import { MdArticle } from "react-icons/md";

export default async function Page() {
	await initCMSPage();

	const providers = await getProviders({});

	const columns = ["name", "description", "url", "rating", "origin", "leaning"];

	return (
		<section className={styles.root}>
			<PageTitle
				title="CMS Providers"
				description="Manage and organize providers"
				variant="cms"
				Icon={MdArticle}
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
			<CreateProviderForm />
		</section>
	);
}
