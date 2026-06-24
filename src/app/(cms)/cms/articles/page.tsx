import { FetchArticlesCMSForm } from "@/components/cms/forms/fetch-articles";
import styles from "./page.module.scss";
import { getArticles, gotoArticle } from "@/actions/cms/article";
import { PaginatedTable } from "@/components/content/components/table/paginated-table";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { CreateArticleForm } from "@/components/cms/forms/article/create-article.form";
import { PageTitle } from "@/components/ui/typography/title/page-title";
import { MdArticle } from "react-icons/md";

export default async function Page() {
	await initCMSPage();

	const articles = await getArticles({});

	// cms utils, cms config.
	// should be stored somewhere?
	const columns = ["title", "src", "variant", "createdAt"];

	return (
		<section className={styles.root}>
			<PageTitle
				title="CMS Articles"
				description="Manage and organize your article content"
				Icon={MdArticle}
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
			<CreateArticleForm />
		</section>
	);
}
