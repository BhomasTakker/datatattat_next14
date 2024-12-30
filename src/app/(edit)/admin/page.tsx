import { getServerSession } from "next-auth";
import styles from "../../page.module.scss";
import { EditPage } from "@/components/edit/edit-page";
import { options } from "../../api/auth/[...nextauth]/options";
import { getUserById } from "@/lib/mongo/actions/user";
import { Session } from "@/types/auth/session";

export const dynamic = "force-dynamic";

export default async function Page({
	searchParams,
}: {
	searchParams?: { route: string };
}) {
	const session = (await getServerSession(options)) as Session;
	const { user: sessionUser } = session;
	const { role } = await getUserById(sessionUser.user_id);

	const adminLevel = "/";

	const { route = adminLevel } = searchParams || {};

	// Get level(s) of access

	if (role !== "admin") {
		return <div>Unauthorized</div>;
	}

	return (
		<div className={styles.page}>
			<EditPage route={route} title="Admin Edit" isAdminEdit={true} />
		</div>
	);
}
