import isSignupComplete from "@/actions/signup/signup-completed";
import isValidSession from "@/actions/auth/check-session";
import { isAdminUser } from "@/actions/auth/check-valid-user";
import { connectToMongoDB } from "@/lib/mongo/db";
import styles from "../page.module.scss";
import { getArticle } from "@/actions/cms/article";
import { redirect } from "next/navigation";
import { ArticleCMSForm } from "@/components/cms/forms/article/article-form";

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

	return (
		<section className={styles.root}>
			<ArticleCMSForm article={article} />
		</section>
	);
}
