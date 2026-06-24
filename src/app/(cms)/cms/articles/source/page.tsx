import styles from "../page.module.scss";
import { PaginatedTable } from "@/components/content/components/table/paginated-table";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { getSources, gotoSource } from "@/actions/cms/source";
import { FetchSourcesCMSForm } from "@/components/cms/forms/article-source/fetch-sources-form";
import { CreateSourceForm } from "@/components/cms/forms/article-source/create-article-source.form";
import { PageTitle } from "@/components/ui/typography/title/page-title";
import { MdArticle } from "react-icons/md";

export default async function Page() {
	await initCMSPage();

	const sources = await getSources({});

	const columns = ["name", "src", "variant"];

	return (
		<section className={styles.root}>
			<PageTitle
				title="CMS Article Sources"
				description="Manage and organize article sources"
				variant="cms"
				Icon={MdArticle}
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
			<CreateSourceForm />
		</section>
	);
}
