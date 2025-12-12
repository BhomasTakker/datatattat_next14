import isSignupComplete from "@/actions/signup/signup-completed";
import isValidSession from "@/actions/auth/check-session";
import { isAdminUser } from "@/actions/auth/check-valid-user";
import { connectToMongoDB } from "@/lib/mongo/db";
import styles from "../../page.module.scss";
import { redirect } from "next/navigation";
import { ArticleProviderCMSForm } from "@/components/cms/forms/article-provider/article-provider-form";
import { getProvider } from "@/actions/cms/provider";
import { getArticles, gotoArticle } from "@/actions/cms/article";
import { PaginatedTable } from "@/components/content/components/table/paginated-table";
import { CMSTitle } from "@/components/cms/title/cms-title";

type Params = Promise<{ id: string }>;
type Props = {
	params: Params;
};

export default async function Page({ params }: Props) {
	// this all seems like it should be in middleware not a page?
	await connectToMongoDB();
	await isValidSession();
	await isSignupComplete();
	await isAdminUser();

	const { id } = await params;

	const articleProvider = await getProvider({
		id: id,
	});

	if (!articleProvider?._id) {
		redirect("/cms/articles/providers/");
	}
	const articles = await getArticles({
		providerId: articleProvider?._id,
	});

	const columns = ["title", "src", "variant", "createdAt"];

	const { name, description } = articleProvider;
	return (
		<section className={styles.root}>
			<CMSTitle title={`Provider: ${name}`} description={`${description}`} />
			{articles && (
				<PaginatedTable
					columns={columns}
					paginatedData={articles}
					fetchPaginatedData={getArticles}
					query={{ providerId: articleProvider?._id }}
					onSelect={gotoArticle}
				/>
			)}
			<ArticleProviderCMSForm
				provider={articleProvider}
				disabled={false}
				useNavigate={false}
			/>
		</section>
	);
}
