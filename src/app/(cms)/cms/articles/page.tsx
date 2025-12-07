import isSignupComplete from "@/actions/signup/signup-completed";
import isValidSession from "@/actions/auth/check-session";
import { isAdminUser } from "@/actions/auth/check-valid-user";
import { connectToMongoDB } from "@/lib/mongo/db";
import { FetchArticlesCMSForm } from "@/components/cms/forms/fetch-articles";
import styles from "./page.module.scss";

export default async function Page() {
	// this all seems like it should be in middleware not a page?
	await connectToMongoDB();
	await isValidSession();
	await isSignupComplete();
	await isAdminUser();

	return (
		<section className={styles.root}>
			<h1>CMS Articles</h1>
			<FetchArticlesCMSForm />
		</section>
	);
}
