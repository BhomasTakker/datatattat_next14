import styles from "../page.module.scss";
import { getArticle } from "@/actions/cms/article";
import { redirect } from "next/navigation";
import { ArticleCMSForm } from "@/components/cms/forms/article/article-form";
import { ArticleProviderCMSForm } from "@/components/cms/forms/article-provider/article-provider-form";
import { initCMSPage } from "@/actions/cms/init-cms-page";
import { ArticleSourceCMSForm } from "@/components/cms/forms/article-source/article-source";
import { getSource } from "@/actions/cms/source";
import { PageTitle } from "@/components/ui/typography/title/page-title";
import { MdArticle } from "react-icons/md";

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
			<PageTitle
				title={`Article: ${title}`}
				description={description}
				variant="cms"
				Icon={MdArticle}
			/>
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
