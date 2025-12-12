import isSignupComplete from "@/actions/signup/signup-completed";
import isValidSession from "@/actions/auth/check-session";
import { isAdminUser } from "@/actions/auth/check-valid-user";
import { connectToMongoDB } from "@/lib/mongo/db";
import styles from "../page.module.scss";
import { getArticle } from "@/actions/cms/article";
import { redirect } from "next/navigation";
import { ArticleCMSForm } from "@/components/cms/forms/article/article-form";
import { ArticleProviderCMSForm } from "@/components/cms/forms/article-provider/article-provider-form";
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

	const article = await getArticle({
		id: id,
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
			<ArticleCMSForm article={article} />
		</section>
	);
}
