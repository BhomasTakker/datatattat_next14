import isSignupComplete from "@/actions/signup/signup-completed";
import isValidSession from "@/actions/auth/check-session";
import { isAdminUser } from "@/actions/auth/check-valid-user";
import { connectToMongoDB } from "@/lib/mongo/db";
import { FetchArticlesCMSForm } from "@/components/cms/forms/fetch-articles";
import styles from "./page.module.scss";
import { getArticles, gotoArticle } from "@/actions/cms/article";
import { PaginatedTable } from "@/components/content/components/table/paginated-table";
import { CMSTitle } from "@/components/cms/title/cms-title";

export default async function Page() {
	// this all seems like it should be in middleware not a page?
	await connectToMongoDB();
	await isValidSession();
	await isSignupComplete();
	await isAdminUser();

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
