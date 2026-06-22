import styles from "../../page.module.scss";
import { redirect } from "next/navigation";
import { ArticleProviderCMSForm } from "@/components/cms/forms/article-provider/article-provider-form";
import { getProvider } from "@/actions/cms/provider";
import { getArticles, gotoArticle } from "@/actions/cms/article";
import { PaginatedTable } from "@/components/content/components/table/paginated-table";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { getSources, gotoSource } from "@/actions/cms/source";
import { PageTitle } from "@/components/ui/typography/title/page-title";
import { MdArticle } from "react-icons/md";

type Params = Promise<{ id: string }>;
type Props = {
	params: Params;
};

export default async function Page({ params }: Props) {
	await initCMSPage();

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

	const sources = await getSources({ name: articleProvider.name });

	const { name, description } = articleProvider;
	return (
		<section className={styles.root}>
			<PageTitle
				title={`Provider: ${name}`}
				description={`${description}`}
				variant="cms"
				Icon={MdArticle}
			/>
			{sources && (
				<PaginatedTable
					title="Provider Sources"
					columns={["name", "src", "variant"]}
					query={{ name: articleProvider?.name }}
					paginatedData={sources}
					fetchPaginatedData={getSources}
					onSelect={gotoSource}
				/>
			)}
			{articles && (
				<PaginatedTable
					title="Provider Articles"
					columns={["title", "src", "variant", "createdAt"]}
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
