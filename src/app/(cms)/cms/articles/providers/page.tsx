import isValidSession from "@/actions/auth/check-session";
import { isAdminUser } from "@/actions/auth/check-valid-user";
import isSignupComplete from "@/actions/signup/signup-completed";
import { connectToMongoDB } from "@/lib/mongo/db";
import styles from "../page.module.scss";
import { FetchProvidersCMSForm } from "@/components/cms/forms/article-provider/fetch-article-provider-form";
import { SimpleTable } from "@/components/content/components/table/simple-table";
import { getProviders } from "@/actions/cms/provider";

export default async function Page() {
	// this all seems like it should be in middleware not a page?
	await connectToMongoDB();
	await isValidSession();
	await isSignupComplete();
	await isAdminUser();

	const providers = await getProviders({});

	const columns = ["name", "description", "url", "rating", "origin", "leaning"];

	return (
		<section className={styles.root}>
			<h1>CMS Providers</h1>
			{providers && <SimpleTable columns={columns} data={providers.data} />}
			<FetchProvidersCMSForm />
		</section>
	);
}
