import { getServerSession } from "next-auth";
import styles from "../../page.module.scss";
import { EditPage } from "@/components/edit/edit-page";
import { options } from "../../api/auth/[...nextauth]/options";
import { getUserById } from "@/lib/mongo/actions/user";
import { Session } from "@/types/auth/session";

export const dynamic = "force-dynamic";

// This is a bit of a hack page
// /admin and /admin/ are the same thing
// But we need to differentiate between the two
// So /admin is now home page admin
// /admin[route] is the admin edit page
export default async function Page() {
	const session = (await getServerSession(options)) as Session;
	const { user: sessionUser } = session;
	const { role } = await getUserById(sessionUser.user_id);

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
