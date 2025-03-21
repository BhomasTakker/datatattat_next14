import styles from "../../../page.module.scss";
import { EditPage } from "@/components/edit/edit-page";
import { PATHS } from "@/lib/routing/paths";
import isValidSession from "@/actions/auth/check-session";
import isSignupComplete from "@/actions/signup/signup-completed";
import { isValidUser } from "@/actions/auth/check-valid-user";
import { connectToMongoDB } from "@/lib/mongo/db";

export const dynamic = "force-dynamic";

type PageProps = {
	params: Promise<{ route: string[] }>;
};

export default async function Page({ params }: PageProps) {
	await connectToMongoDB();
	await isValidSession();
	await isSignupComplete();

	const { role } = await isValidUser();

	// need select from multiple levels of admin?
	const adminLevel = PATHS.home();

	const { route } = await params;
	const joined = route.join("/");

	// Get/Check level(s) of access
	if (role !== "admin") {
		return <div>Unauthorized</div>;
	}

	return (
		<div className={styles.page}>
			<EditPage route={`/${joined}`} title="Admin Edit" isAdminEdit={true} />
		</div>
	);
}
