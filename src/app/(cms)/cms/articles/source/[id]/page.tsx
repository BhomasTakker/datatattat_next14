import styles from "../../page.module.scss";
import { redirect } from "next/navigation";
import { CMSTitle } from "@/components/cms/title/cms-title";
import { getSource } from "@/actions/cms/source";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { ArticleSourceCMSForm } from "@/components/cms/forms/article-source/article-source";
import { getProvider } from "@/actions/cms/provider";
import { ArticleProviderCMSForm } from "@/components/cms/forms/article-provider/article-provider-form";
import { getArticles, gotoArticle } from "@/actions/cms/article";
import { PaginatedTable } from "@/components/content/components/table/paginated-table";

type Params = Promise<{ id: string }>;
type Props = {
	params: Params;
};

export default async function Page({ params }: Props) {
	await initCMSPage();

	const { id } = await params;

	const source = await getSource({
		id: id,
	});

	if (!source?._id) {
		redirect("/cms/articles/source");
	}

	const { name, src } = source;

	const provider = await getProvider({
		name,
	});

	const articles = await getArticles({
		sourceId: source._id,
	});

	return (
		<section className={styles.root}>
			<CMSTitle title={`Article Source: ${name}`} description={src} />
			{provider && (
				<ArticleProviderCMSForm
					provider={provider}
					disabled={true}
					useNavigate={true}
				/>
			)}
			{articles && (
				<PaginatedTable
					title="Source Articles"
					columns={["title", "src", "variant", "createdAt"]}
					paginatedData={articles}
					fetchPaginatedData={getArticles}
					query={{ sourceId: source._id }}
					onSelect={gotoArticle}
				/>
			)}
			<ArticleSourceCMSForm source={source} />
		</section>
	);
}
