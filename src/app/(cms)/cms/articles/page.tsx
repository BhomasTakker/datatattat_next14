import { FetchArticlesCMSForm } from "@/components/cms/forms/fetch-articles";
import styles from "./page.module.scss";
import { getArticles, gotoArticle } from "@/actions/cms/article";
import { PaginatedTable } from "@/components/content/components/table/paginated-table";
import { CMSTitle } from "@/components/cms/title/cms-title";
import { initCMSPage } from "@/actions/cms/init-cms-page";

export default async function Page() {
	await initCMSPage();

	const articles = await getArticles({});

	const columns = ["title", "src", "variant", "createdAt"];

	return (
		<section className={styles.root}>
			<CMSTitle
				title="CMS Articles"
				description="Manage and organize your article content"
			/>
			{articles && (
				<PaginatedTable
					columns={columns}
					paginatedData={articles}
					fetchPaginatedData={getArticles}
					onSelect={gotoArticle}
				/>
			)}
			<FetchArticlesCMSForm />
		</section>
	);
}
