import isValidSession from "@/actions/auth/check-session";
import { isAdminUser } from "@/actions/auth/check-valid-user";
import isSignupComplete from "@/actions/signup/signup-completed";
import { connectToMongoDB } from "@/lib/mongo/db";
import styles from "../page.module.scss";
import { FetchProvidersCMSForm } from "@/components/cms/forms/article-provider/fetch-article-provider-form";
import { getProviders, gotoProvider } from "@/actions/cms/provider";
import { PaginatedTable } from "@/components/content/components/table/paginated-table";
import { CMSTitle } from "@/components/cms/title/cms-title";

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
			<CMSTitle
				title="CMS Providers"
				description="Manage and organize providers"
			/>
			{providers && (
				<PaginatedTable
					columns={columns}
					paginatedData={providers}
					fetchPaginatedData={getProviders}
					onSelect={gotoProvider}
				/>
			)}
			<FetchProvidersCMSForm />
		</section>
	);
}
