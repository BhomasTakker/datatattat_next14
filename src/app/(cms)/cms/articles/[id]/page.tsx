import styles from "../page.module.scss";
import { getArticle } from "@/actions/cms/article";
import { redirect } from "next/navigation";
import { ArticleCMSForm } from "@/components/cms/forms/article/article-form";
import { ArticleProviderCMSForm } from "@/components/cms/forms/article-provider/article-provider-form";
import { CMSTitle } from "@/components/cms/title/cms-title";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { ArticleSourceCMSForm } from "@/components/cms/forms/article-source/article-source";
import { getSource } from "@/actions/cms/source";

type Params = Promise<{ id: string }>;
type Props = {
	params: Params;
};

export default async function Page({ params }: Props) {
	await initCMSPage();

	const { id } = await params;

	const article = await getArticle({
		id: id,
	});

	const sourceFeed = await getSource({
		id: article?.feed?._id || "",
	});

	if (!article?._id) {
		redirect("/cms/articles");
	}

	const { title, description } = article;

	return (
		<section className={styles.root}>
			<CMSTitle title={`Article: ${title}`} description={description} />
			{article.provider && (
				<ArticleProviderCMSForm
					provider={article.provider}
					disabled={true}
					useNavigate={true}
				/>
			)}
			{sourceFeed && (
				<ArticleSourceCMSForm source={sourceFeed} disabled={true} />
			)}
			<ArticleCMSForm article={article} />
		</section>
	);
}
