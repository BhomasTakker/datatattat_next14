import styles from "../../page.module.scss";
import { EditPage } from "@/components/edit/edit-page";
import isValidSession from "@/actions/auth/check-session";
import isSignupComplete from "@/actions/signup/signup-completed";
import { isValidUser } from "@/actions/auth/check-valid-user";
import { connectToMongoDB } from "@/lib/mongo/db";

export const dynamic = "force-dynamic";

// This is a bit of a hack page
// /admin and /admin/ are the same thing
// But we need to differentiate between the two
// So /admin is now home page admin
// /admin[route] is the admin edit page
export default async function Page() {
	await connectToMongoDB();
	await isValidSession();
	await isSignupComplete();

	const { role } = await isValidUser();

	// need select from multiple levels of admin?
	const adminLevel = "/";

	if (role !== "admin") {
		return <div>Unauthorized</div>;
	}

	return (
		<div className={styles.page}>
			<EditPage route={adminLevel} title="Admin Edit" isAdminEdit={true} />
		</div>
	);
}
